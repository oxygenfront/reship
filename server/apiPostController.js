import tools from "./tools.js";
import database from "./database.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import date_correct from "date-fns";
import axios from "axios";

const url = "http://localhost:5000";
const logging = "[LOGGING]";

const sdek_client_id = "TaocB08kPoXDHhizYHHgpJrL8ZCpZj3f";
const sdek_client_secret = "27EMoRZBSyo2nn1IjbdOrpGWwqO23g1D";
const sdek_url = "api.cdek.ru";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "semenov2denis2@gmail.com",
    pass: "omichfgzqsquprgo",
  },
  secure: true,
});

function log(text) {
  console.log(`${logging} ${Date.now()} ${text}`);
}

async function getTokenSDEK() {
  const payload = {
    grant_type: "client_credentials",
    client_id: sdek_client_id,
    client_secret: sdek_client_secret,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const token = await axios.post(
    "https://api.cdek.ru/v2/oauth/token",
    payload,
    { headers }
  );

  return token.data.access_token;
}

async function getOrderSdek(uuid) {
  try {
    const token = await getTokenSDEK();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const resp = await axios.get(
      `https://${sdek_url}/v2/orders?cdek_number=${uuid} `,
      config
    );

    return resp.data.entity;
  } catch (e) {
    return -1;
  }
}

function compare_highest(a, b) {
  const priceA = a.summ_price;
  const priceB = b.summ_price;

  let comparison = 0;
  if (priceA < priceB) {
    comparison = 1;
  } else if (priceA > priceB) {
    comparison = -1;
  }
  return comparison;
}

function compare_lowest(a, b) {
  const priceA = a.summ_price;
  const priceB = b.summ_price;

  let comparison = 0;
  if (priceA > priceB) {
    comparison = 1;
  } else if (priceA < priceB) {
    comparison = -1;
  }
  return comparison;
}

class ApiPostController {
  async registration(request, response) {
    try {
      if (
        !request.body.hasOwnProperty("first_name") ||
        !request.body.hasOwnProperty("last_name") ||
        !request.body.hasOwnProperty("password") ||
        !request.body.hasOwnProperty("email") ||
        !request.body.hasOwnProperty("adress_delivery") ||
        !request.body.hasOwnProperty("date_of_birth_unix")
      ) {
        return response
          .status(400)
          .json({ error: "Некорректные данные", bcode: 1 });
      }

      const first_name = tools.delInjection(request.body.first_name);
      const last_name = tools.delInjection(request.body.last_name);
      const password = tools.delInjection(request.body.password);
      const email = tools.delInjection(request.body.email);
      const adress_delivery = JSON.parse(request.body.adress_delivery);
      const date_of_birth_unix = tools.delInjection(
        request.body.date_of_birth_unix
      );

      database.query(
        'SELECT * FROM `users` WHERE email="' + email + '"',
        (error, rows, fields) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 1.1 });
          }

          if (rows.length == 0) {
            const new_token = "reship.api" + tools.createToken(50);

            database.query(
              "INSERT INTO `users` (`first_name`, `last_name`, `email`, `avatar`, `adress_delivery`, `token`, `date_register_timestamp`, `password_md5`, `email_active`, `favorites`, `admin`, `basket`, `date_of_birth`, `number_tel`, `country`) VALUES " +
                `('${first_name}', '${last_name}', '${email}', '/client/public/assets/user_img/default.jpg', '${JSON.stringify(
                  adress_delivery
                )}', '${new_token}', '${Date.now()}', '${crypto
                  .createHash("md5")
                  .update(password)
                  .digest("hex")}', '1', '${JSON.stringify(
                  []
                )}', '0', '${JSON.stringify(
                  []
                )}', '${date_of_birth_unix}', '', '');`,
              (error, rows, fields) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 1.2 });
                }

                let activation_code = tools.createToken(50);

                let mailData = {
                  from: "[RESHIP] Активация аккаунта",
                  to: email,
                  subject: "[RESHIP] Активация аккаунта",
                  text:
                    `Активируйте аккаунт по ссылке: ${url}/api/activateEmail?code=` +
                    activation_code,
                };

                // transporter.sendMail(mailData, function (err, info) {
                //   if (err) {
                //     return response.status(400).json({
                //       error: 'Указана несуществующая почта',
                //       bcode: 1.3,
                //     });
                //   } else {
                //     database.query(
                //       "INSERT INTO `activate_email` (`email`, `code`) VALUES ('" +
                //         email +
                //         "', '" +
                //         activation_code +
                //         "');",
                //       (error, rows, fields) => {
                //         if (error) {
                //           return response
                //             .status(500)
                //             .json({ error: 'Ошибка на сервере', bcod });
                //         }

                //         return response.status(400).json({ token: new_token });
                //       }
                //     );
                //   }
                // });

                database.query(
                  `INSERT INTO \`activate_email\` (\`email\`, \`code\`) VALUES ('${email}', '${activation_code}');`,
                  (error, rows, fields) => {
                    if (error) {
                      return response
                        .status(500)
                        .json({ error: "Ошибка на сервере", bcode: 1.3 });
                    }

                    response.header("Authorization", new_token);
                    return response.json({ token: new_token });
                  }
                );
              }
            );
          } else {
            return response
              .status(400)
              .json({ error: "Данная электронная почта занята", bcode: 1.5 });
          }
        }
      );
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Произошла неизвестная ошибка", bcode: 1.11111 });
    }
  }

  async getProducts(request, response) {
    const { title, category, price_start, price_end } = request.query;

    let sql = "SELECT * FROM products WHERE 1=1";

    if (title) {
      sql += ` AND name LIKE '%${tools.delInjection(title)}%'`;
    }

    if (category) {
      sql += ` AND category='${tools.delInjection(category)}'`;
    }

    if (price_start && price_end) {
      sql += ` AND price BETWEEN ${tools.delInjection(
        price_start
      )} AND ${tools.delInjection(price_end)}`;
    } else if (price_start) {
      sql += ` AND price > ${tools.delInjection(price_start)}`;
    } else if (price_end) {
      sql += ` AND price < ${tools.delInjection(price_end)}`;
    }

    database.query(sql, (error, rows, fields) => {
      if (error) {
        return response
          .status(500)
          .json({ error: "Ошибка на сервере", bcode: 2.2 });
      }
      response.json(rows);
    });
  }

  async auth(request, response) {
    if (
      !request.body.hasOwnProperty("email") ||
      !request.body.hasOwnProperty("password")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 3 });
    }

    const password = tools.delInjection(request.body.password);
    const email = tools.delInjection(request.body.email);

    database.query(
      `SELECT * FROM \`users\` WHERE email='${email}' AND password_md5='${crypto
        .createHash("md5")
        .update(password)
        .digest("hex")}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 3.1,  });
        }

        if (rows.length == 1) {
          return response.json({ token: rows[0].token });
        } else {
          return response
            .status(400)
            .json({ error: "Неверный логин или пароль", bcode: 3.2 });
        }
      }
    );
  }

  async getUser(request, response) {
    if (!request.headers.hasOwnProperty("authorization")) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 4 });
    }

    const token = tools.delInjection(request.headers.authorization);

    if (token === "null") {
      return response.json({
        message: "Пользователь не авторизован",
        bcode: 4.3,
      });
    }

    database.query(
      `SELECT * FROM \`users\` WHERE token='${token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 4.1 });
        }

        if (rows.length == 1) {
          database.query(
            `SELECT * FROM \`orders\` WHERE customer_id='${rows[0].id}'`,
            (error, rows_orders, fields) => {
              for (let i = 0; i < rows_orders.length; i++) {
                rows_orders[i].products = JSON.parse(rows_orders[i].products);
              }

              const orders = rows_orders;

              const response_json = {
                id: rows[0].id,
                first_name: rows[0].first_name,
                last_name: rows[0].last_name,
                email: rows[0].email,
                avatar: rows[0].avatar,
                adress_delivery: rows[0].adress_delivery,
                date_register_timestamp: rows[0].date_register_timestamp,
                admin: rows[0].admin,
                date_of_birth: rows[0].date_of_birth,
                number_tel: rows[0].number_tel,
                country: rows[0].country,
                favorites: JSON.parse(rows[0].favorites),
                basket: JSON.parse(rows[0].basket),
                orders: orders,
              };

              return response.json(response_json);
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 4.2 });
        }
      }
    );
  }

  async changePassword(request, response) {
    if (
      !tools.checkJsonKey(request.body, "password") ||
      !tools.checkJsonKey(request.body, "new_password") ||
      !request.headers.hasOwnProperty("authorization")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 5 });
    }

    const password = tools.delInjection(request.body.password);
    const new_password = tools.delInjection(request.body.new_password);
    const token = tools.delInjection(request.headers.authorization);

    database.query(
      `SELECT * FROM \`users\` WHERE token='${token}' AND password_md5='${crypto
        .createHash("md5")
        .update(password)
        .digest("hex")}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 5.1 });
        }

        if (rows.length == 1) {
          const new_token = "reship.api" + tools.createToken(50);

          database.query(
            `UPDATE \`users\` SET \`password_md5\` = '${crypto
              .createHash("md5")
              .update(new_password)
              .digest("hex")}' WHERE token='${token}';`
          );
          database.query(
            `UPDATE \`users\` SET \`token\` = '${new_token}' WHERE token='${token}';`
          );

          return response.json({ token: new_token });
        } else {
          return response
            .status(400)
            .json({ error: "Неверный пароль", bcode: 5.2 });
        }
      }
    );
  }

  async changeEmail(request, response) {
    if (
      !request.body.hasOwnProperty("password") ||
      !request.body.hasOwnProperty("new_email") ||
      !request.headers.hasOwnProperty("authorization")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 6 });
    }

    const password = tools.delInjection(request.body.password);
    const new_email = tools.delInjection(request.body.new_email);
    const token = tools.delInjection(request.headers.authorization);

    database.query(
      `SELECT * FROM \`users\` WHERE token='${token}' AND password_md5='${crypto
        .createHash("md5")
        .update(password)
        .digest("hex")}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 6.1 });
        }

        if (rows.length == 1) {
          const new_token = "reship.api" + tools.createToken(50);

          database.query(
            `UPDATE \`users\` SET \`email\` = '${new_email}' WHERE token='${token}';`
          );
          database.query(
            `UPDATE \`users\` SET \`token\` = '${new_token}' WHERE token='${token}';`
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response
            .status(400)
            .json({ error: "Неверный пароль", bcode: 6.2 });
        }
      }
    );
  }

  async activateEmail(request, response) {
    if (!tools.checkJsonKey(request.query, "code")) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 7 });
    }

    let code = tools.delInjection(request.query.code);

    database.query(
      "SELECT * FROM `activate_email` WHERE code='" + code + "'",
      (error, rows_email, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 7.1 });
        }

        if (rows_email.length == 1) {
          database.query(
            "UPDATE `users` SET `email_active` = '1' WHERE email='" +
              rows_email[0].email +
              "';",
            (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 7.2 });
              }

              database.query(
                "DELETE FROM `activate_email` WHERE email='" +
                  rows_email[0].email +
                  "';",
                (error, rows, fields) => {
                  if (error) {
                    return response
                      .status(500)
                      .json({ error: "Ошибка на сервере", bcode: 7.3 });
                  }

                  return response.redirect("/");
                }
              );
            }
          );
        } else {
          // return response.status(400).json({'error': 'Активация не требуется', 'bcode': 7.4})
          return response.redirect("/");
        }
      }
    );
  }

  async recoveryPassword(request, response) {
    if (!tools.checkJsonKey(request.body, "email")) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 8 });
    }

    const email = tools.delInjection(request.body.email);

    database.query(
      `SELECT * FROM \`users\` WHERE email='${email}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 8.1 });
        }

        if (rows.length == 1) {
          const new_token = "reship.api" + tools.createToken(50);

          database.query(
            `UPDATE \`users\` SET \`email\` = '${new_email}' WHERE token='${token}';`
          );
          database.query(
            `UPDATE \`users\` SET \`token\` = '${new_token}' WHERE token='${token}';`
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response.status(400).json({
            error: "Пользователя с данной эл. почтой не найден",
            bcode: 8.2,
          });
        }
      }
    );
  }

  async getProductById(request, response) {
    const id = tools.delInjection(request.params.id);

    database.query(
      `SELECT * FROM \`products\` WHERE id='${id}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 9.1 });
        }

        response.json(rows[0]);
      }
    );
  }

  async getProductsAll(request, response) {
    database.query(`SELECT * FROM \`products\``, (error, rows, fields) => {
      if (error) {
        return response
          .status(500)
          .json({ error: "Ошибка на сервере", bcode: 10 });
      }

      let response_json_new = [];

      for (let i = 0; i < rows.length; i++) {
        let response_json = rows[i];

        response_json.colors = JSON.parse(response_json.colors);
        response_json.colors_avail = JSON.parse(response_json.colors_avail);
        response_json.parameters = JSON.parse(response_json.parameters);
        response_json.image_link = JSON.parse(response_json.image_link);
        response_json.parameters_avail = JSON.parse(
          response_json.parameters_avail
        );

        response_json_new.push(response_json);
      }

      response.json(response_json_new);
    });
  }

  async createProduct(request, response) {
    try {
      if (
        !tools.checkJsonKey(request.body, "name") ||
        !tools.checkJsonKey(request.body, "description_small") ||
        !tools.checkJsonKey(request.body, "description_full") ||
        !tools.checkJsonKey(request.body, "old_price") ||
        !tools.checkJsonKey(request.body, "price") ||
        !tools.checkJsonKey(request.body, "availability") ||
        !tools.checkJsonKey(request.body, "colors") ||
        !tools.checkJsonKey(request.body, "colors_avail") ||
        !tools.checkJsonKey(request.body, "parameters") ||
        !tools.checkJsonKey(request.body, "parameters_avail") ||
        !tools.checkJsonKey(request.body, "image_links") ||
        !tools.checkJsonKey(request.body, "category") ||
        // !tools.checkJsonKey(request.body, "info_category") ||
        !tools.checkJsonKey(request.body, "brand") ||
        !tools.checkJsonKey(request.body, "feature") ||
        !tools.checkJsonKey(request.body, "type") ||
        !tools.checkJsonKey(request.body, "parameters_dop") ||
        !tools.checkJsonKey(request.body, "token")
      ) {
        return response
          .status(400)
          .json({ error: "Некорректные данные", bcode: 11 });
      }

      const name = tools.delInjection(request.body.name);
      const description_small = tools.delInjection(
        request.body.description_small
      );

      const description_full = tools.delInjection(
        request.body.description_full
      );

      const old_price = tools.delInjection(request.body.old_price);
      const price = tools.delInjection(request.body.price);
      const availability = tools.delInjection(request.body.availability);
      // const info_category = tools.delInjection(request.body.info_category);
      const brand = tools.delInjection(request.body.brand);
      const feature = tools.delInjection(request.body.feature);

      const colors = JSON.parse(request.body.colors);
      const colors_avail = JSON.parse(request.body.colors_avail);
      const parameters = JSON.parse(request.body.parameters);
      const parameters_avail = JSON.parse(request.body.parameters_avail);
      const type = JSON.parse(request.body.type);
      const parameters_dop = JSON.parse(request.body.parameters_dop);

      const image_links = JSON.parse(request.body.image_links);
      const category = tools.delInjection(request.body.category);

      const token = tools.delInjection(request.body.token);

      database.query(
        `SELECT * FROM \`users\` WHERE token='${token}'`,
        (error, rows, fields) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 11.1 });
          }

          if (rows.length == 1) {
            if (rows[0].admin == 0) {
              return response.json({
                error: "У вас недостаточно прав",
                bcode: 11.3,
              });
            } else {
              database.query(
                `INSERT INTO \`products\` (\`name\`, \`description_small\`, \`description_full\`, \`old_price\`, \`price\`, \`availability\`, \`colors\`, \`colors_avail\`, \`parameters\`, \`parameters_avail\`, \`image_link\`, \`category\`, \`info_category\`, \`brand\`, \`feature\`, \`type\`, \`parameters_dop\`) VALUES ('${name}', '${description_small}', '${description_full}', '${old_price}', '${price}', '${availability}', '${JSON.stringify(
                  colors
                )}', '${JSON.stringify(colors_avail)}', '${JSON.stringify(
                  parameters
                )}', '${JSON.stringify(parameters_avail)}', '${JSON.stringify(
                  image_links
                )}', '${category}', '', '${brand}', '${feature}', '${JSON.stringify(
                  type
                )}', '${JSON.stringify(parameters_dop)}');`,
                (error, rows, fields) => {
                  if (error) {
                    return response.status(500).json({
                      error: "Ошибка на сервере",
                      bcode: 11.4,
                      
                    });
                  }

                  return response.json({ product_id: rows.insertId });
                }
              );
            }
          } else {
            return response
              .status(400)
              .json({ error: "Ошибка доступа", bcode: 11.2 });
          }
        }
      );
    } catch {
      return response
        .status(400)
        .json({ error: "Неизвестная ошибка", bcode: 11.11111 });
    }
  }

  async changeProduct(request, response) {
    const requiredKeys = [
      "id",
      "name",
      "description_small",
      "description_full",
      "old_price",
      "price",
      "availability",
      "colors",
      "colors_avail",
      "parameters",
      "parameters_avail",
      "image_link",
      "category",
      "token",
    ];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 12 });
    }

    const {
      id,
      name,
      description_small,
      description_full,
      old_price,
      price,
      availability,
      colors,
      colors_avail,
      parameters,
      parameters_avail,
      image_link,
      category,
      token,
    } = requestData;

    const sanitizedValues = {
      id: tools.delInjection(id),
      name: tools.delInjection(name),
      description_small: tools.delInjection(description_small),
      description_full: tools.delInjection(description_full),
      old_price: tools.delInjection(old_price),
      price: tools.delInjection(price),
      availability: tools.delInjection(availability),

      colors: JSON.parse(colors),
      colors_avail: JSON.parse(colors_avail),
      parameters: JSON.parse(parameters),
      parameters_avail: JSON.parse(parameters_avail),

      image_link: JSON.parse(image_link),
      category: tools.delInjection(category),
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 12.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 12.3,
            });
          } else {
            let sql_start = "UPDATE `products` SET ";

            if (sanitizedValues.name) {
              sql_start += "`name` = '" + sanitizedValues.name + "',";
            }

            if (sanitizedValues.description_small) {
              sql_start +=
                "`description_small` = '" +
                sanitizedValues.description_small +
                "',";
            }

            if (sanitizedValues.description_full) {
              sql_start +=
                "`description_full` = '" +
                sanitizedValues.description_full +
                "',";
            }

            if (sanitizedValues.old_price) {
              sql_start += "`old_price` = '" + sanitizedValues.old_price + "',";
            }

            if (sanitizedValues.price) {
              sql_start += "`price` = '" + sanitizedValues.price + "',";
            }

            if (sanitizedValues.availability) {
              sql_start +=
                "`availability` = '" + sanitizedValues.availability + "',";
            }

            if (sanitizedValues.colors) {
              sql_start +=
                "`colors` = '" + JSON.stringify(sanitizedValues.colors) + "',";
            }

            if (sanitizedValues.colors_avail) {
              sql_start +=
                "`colors_avail` = '" +
                JSON.stringify(sanitizedValues.colors_avail) +
                "',";
            }

            if (sanitizedValues.parameters) {
              sql_start +=
                "`parameters` = '" +
                JSON.stringify(sanitizedValues.parameters) +
                "',";
            }

            if (sanitizedValues.parameters_avail) {
              sql_start +=
                "`parameters_avail` = '" +
                JSON.stringify(sanitizedValues.parameters_avail) +
                "',";
            }

            if (sanitizedValues.image_link) {
              sql_start +=
                "`image_link` = '" + sanitizedValues.image_link + "',";
            }

            if (sanitizedValues.category) {
              sql_start += "`category` = '" + sanitizedValues.category + "'";
            }

            let sql_end = sql_start + " WHERE id='" + sanitizedValues.id + "';";

            database.query(sql_end, (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 12.5 });
              }

              return response.json({ product_id: sanitizedValues.id });
            });
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 12.2 });
        }
      }
    );
  }

  async deleteProduct(request, response) {
    const requiredKeys = ["id"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 13 });
    }

    const { id } = requestData;

    const sanitizedValues = {
      id: tools.delInjection(id),
    };

    database.query(
      `DELETE FROM products WHERE id=${sanitizedValues.id}`,
      (error) => {
        if (error) {
          return response.status(400).json({
            error: "Ошибка при удалении товара из БД",
            bcode: 13.1,
            
          });
        }

        response.json({ id: sanitizedValues.id });
      }
    );
  }

  async addFavorites(request, response) {
    const requiredKeys = ["product_id"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey || !request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 14 });
    }

    const { product_id } = requestData;

    const sanitizedValues = {
      product_id: tools.delInjection(product_id),
      token: tools.delInjection(request.headers.authorization),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 14.1 });
        }

        if (rows.length == 1) {
          database.query(
            `SELECT * FROM \`products\` WHERE id='${sanitizedValues.product_id}'`,
            (error, rows_product, fields) => {
              if (rows_product.length == 1) {
                const favorites = JSON.parse(rows[0].favorites);

                for (let i = 0; i < favorites.length; i++) {
                  if (favorites[i].product_id === sanitizedValues.product_id) {
                    return response.status(400).json({
                      error: "Товар уже находится в избранных",
                      bcode: 14.4,
                    });
                  }
                }

                let new_favorites = favorites;
                new_favorites.push({
                  product_id: sanitizedValues.product_id,
                  name: rows_product[0].name,
                  price: rows_product[0].price,
                });

                database.query(
                  `UPDATE \`users\` SET \`favorites\` = '${JSON.stringify(
                    new_favorites
                  )}' WHERE \`token\`='${sanitizedValues.token}';`,
                  (error) => {
                    if (error) {
                      return response
                        .status(500)
                        .json({ error: "Ошибка на сервере", bcode: 14.3 });
                    }

                    response.json({
                      message: "Товар успешно добавлен в избранные",
                      favorites: new_favorites,
                    });
                  }
                );
              } else {
                return response
                  .status(500)
                  .json({ error: "Товара не существует", bcode: 14.4 });
              }
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 14.2 });
        }
      }
    );
  }

  async deleteFavorites(request, response) {
    const requiredKeys = ["product_id", "token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 16 });
    }

    const { product_id, token } = requestData;

    const sanitizedValues = {
      product_id: tools.delInjection(product_id),
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 16.1 });
        }

        if (rows.length == 1) {
          let favorites = JSON.parse(rows[0].favorites);

          for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].product_id === sanitizedValues.product_id) {
              favorites.splice(i, 1);
              break;
            }
          }

          let new_favorites = favorites;

          database.query(
            `UPDATE \`users\` SET \`favorites\` = '${JSON.stringify(
              new_favorites
            )}' WHERE \`token\`='${sanitizedValues.token}';`,
            (error) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 16.3 });
              }

              response.json({
                message: "Товар успешно удален из избранных",
                favorites: new_favorites,
              });
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 16.2 });
        }
      }
    );
  }

  async createOrder(request, response) {
    try {
      const requiredKeys = [
        "first_name",
        "last_name",
        "number",
        "email",
        "adress",
        "promocode",
        "basket",
        "tariff_code",
      ];

      const requestData = request.body;

      const missingKey = requiredKeys.find(
        (key) => !requestData.hasOwnProperty(key)
      );
      if (missingKey || !request.headers.hasOwnProperty('authorization')) {
        return response
          .status(400)
          .json({ error: "Некорректные данные", bcode: 17 });
      }

      const {
        first_name,
        last_name,
        number,
        email,
        adress,
        promocode,
        basket,
        tariff_code,
      } = requestData;

      const sanitizedValues = {
        first_name: tools.delInjection(first_name),
        last_name: tools.delInjection(last_name),
        number: tools.delInjection(number),
        email: tools.delInjection(email),
        adress: JSON.parse(adress),
        promocode: tools.delInjection(promocode),
        basket: JSON.parse(basket),
        token: tools.delInjection(request.headers.authorization),
        tariff_code: tools.delInjection(tariff_code),
      };

      const date_create = Date.now();

      let customer_id = -1;
      let basket_json = sanitizedValues.basket;

      database.query(
        `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
        (error, rows, fields) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 17.1 });
          }

          if (rows.length == 1) {
            customer_id = rows[0].id;
          }

          if (basket_json.length < 1) {
            return response
              .status(500)
              .json({ error: "В корзине нет товаров", bcode: 17.4 });
          }

          let full_price = 0;
          for (let i = 0; i < basket_json.length; i++) {
            full_price += basket_json[i].price;

            basket_json[i].date_create = date_create;
            basket_json[i].init =
              sanitizedValues.first_name + " " + sanitizedValues.last_name;
            basket_json[i].adress = sanitizedValues.adress;
            basket_json[i].status = -1;
          }

          database.query(
            "INSERT INTO `orders` (`first_name`, `last_name`, `number`, `email`, `adress`, `status`, `customer_id`, `date_start`, `date_end`, `products`, `summ_price`, `tariff_code`, `uuid_sdek`) VALUES (?, ?, ?, ?, ?, '-1', ?, ?, '0', ?, ?, ?, ?)",
            [
              sanitizedValues.first_name,
              sanitizedValues.last_name,
              sanitizedValues.number,
              sanitizedValues.email,
              JSON.stringify(sanitizedValues.adress),
              customer_id,
              date_create,
              JSON.stringify(basket_json),
              full_price,
              sanitizedValues.tariff_code,
              "",
            ],
            (error, rows_order) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 17.3,  });
              }

              database.query(
                `UPDATE \`users\` SET \`basket\` = '[]' WHERE \`id\` = ${customer_id};`,
                (error, rows) => {
                  if (error) {
                    return response
                      .status(400)
                      .json({ error: "Ошибка на сервере", bcode: 17.5 });
                  }

                  let old_price = 0;

                  old_price = full_price;

                  database.query(
                    `SELECT * FROM \`promo\` WHERE promocode='${sanitizedValues.promocode}'`,
                    (error, rows_promo) => {
                      if (error) {
                        return response
                          .status(400)
                          .json({ error: "Ошибка на сервере", bcode: 17.7 });
                      }

                      let info = {
                        message: "Промокод не использован",
                        persent: 0,
                        promocode: "",
                      };

                      if (rows_promo.length == 1) {
                        if (Date.now() < rows_promo[0].date_end) {
                          full_price =
                            full_price -
                            (full_price * rows_promo[0].persent) / 100;
                          info.message = "Промокод использован";
                          info.persent = rows_promo[0].persent;
                          info.promocode = rows_promo[0].promocode;
                        } else {
                          info.message = "Время действия промокода истекло";
                          info.persent = rows_promo[0].persent;
                          info.promocode = rows_promo[0].promocode;
                        }
                      }

                      const code_payment = tools.generateCode();

                      database.query(
                        `INSERT INTO \`payments\` (\`order_id\`, \`price\`, \`date_create\`, \`status\`, \`code\`) VALUES ('${
                          rows_order.insertId
                        }', '${Math.round(
                          full_price
                        )}', '${Date.now()}', '0', '${code_payment}');`,
                        (error, rows) => {
                          if (error) {
                            return response.status(400).json({
                              error: "Ошибка на сервере",
                              bcode: 17.6,
                              
                            });
                          }

                          response.json({
                            order_id: rows_order.insertId,
                            code_payment: code_payment,
                            old_price: old_price,
                            full_price: Math.round(full_price),
                            info: info,
                            adress: sanitizedValues.adress,
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    } catch {
      return response.status(400).json({
        error: "Неизвестная ошибка",
        bcode: 17.11111,
      });
    }
  }

  async getOrdersByCustomerId(request, response) {
    if (
      !request.query.hasOwnProperty("type") ||
      !request.query.hasOwnProperty("customer_id")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 18 });
    }

    const type = tools.delInjection(request.query.type);
    const customer_id = tools.delInjection(request.query.customer_id);

    let type_string = 0;

    switch (type) {
      case "completed":
        type_string = 1;
        break;
      case "waited":
        type_string = 0;
        break;
      case "no_payed":
        type_string = -1;
        break;
      case "all":
        type_string = 5;
        break;
    }

    database.query(
      `SELECT * FROM \`orders\` WHERE customer_id='${customer_id}'`,
      async (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 18.1 });
        }

        let ready_json = [];

        for (let i = 0; i < rows.length; i++) {
          if (
            parseInt(rows[i]["status"]) === type_string ||
            type_string === 5
          ) {
            if (
              request.query.date_start !== undefined &&
              request.query.date_end !== undefined
            ) {
              if (request.query.date_start === "") request.query.date_start = 0;
              if (request.query.date_end === "")
                request.query.date_end = 99999999999999;

              const if_date =
                parseInt(rows[i].date_start) >=
                  parseInt(request.query.date_start) &&
                parseInt(rows[i].date_start) <=
                  parseInt(request.query.date_end);
              if (!if_date) {
                continue;
              }
            }

            if (
              request.query.price_start !== undefined &&
              request.query.price_end !== undefined
            ) {
              if (request.query.price_start === "")
                request.query.price_start = 0;
              if (request.query.price_end === "")
                request.query.price_end = 99999999999999;

              const if_price =
                parseInt(rows[i].summ_price) >=
                  parseInt(request.query.price_start) &&
                parseInt(rows[i].summ_price) <=
                  parseInt(request.query.price_end);

              if (!if_price) {
                continue;
              }
            }

            rows[i].products = JSON.parse(rows[i].products);
            ready_json.push(rows[i]);
          }
        }

        if (request.query.price_filter !== undefined) {
          if (request.query.price_filter === "highest") {
            ready_json.sort(compare_highest);
          } else {
            ready_json.sort(compare_lowest);
          }
        }

        for (let i = 0; i < ready_json.length; i++) {
          if (ready_json[0].uuid !== "") {
            const sdek_order = await getOrderSdek(ready_json[0].uuid_sdek);
            ready_json[0].sdek_order = sdek_order;
          }
        }

        response.json(ready_json);
      }
    );
  }

  async getOrder(request, response) {
    const requiredKeys = ["id"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 19 });
    }

    const { id } = requestData;

    const sanitizedValues = {
      id: tools.delInjection(id),
    };

    database.query(
      `SELECT * FROM \`orders\` WHERE id='${sanitizedValues.id}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 19.1 });
        }

        response.json(rows[0]);
      }
    );
  }

  async getOrdersAll(request, response) {
    if (!request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 20 });
    }

    const sanitizedValues = {
      token: tools.delInjection(request.headers.authorization),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 20.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 20.3,
            });
          } else {
            database.query(
              `SELECT * FROM \`orders\``,
              (error, rows, fields) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 20.4 });
                }

                response.json(rows);
              }
            );
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 20.2 });
        }
      }
    );
  }

  async changeAvatar(request, response) {
    response.json({ success: true, message: "Файл успешно загружен" });
  }

  async getPayments(request, response) {
    if (!request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 24 });
    }

    const sanitizedValues = {
      token: tools.delInjection(request.headers.authorization),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 24.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 24.3,
            });
          } else {
            database.query(`SELECT * FROM \`payments\``, (error, rows) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 24.4 });
              }

              response.json(rows);
            });
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 24.2 });
        }
      }
    );
  }

  async acceptPayment(request, response) {
    const requiredKeys = ["payment_id", "uuid"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );

    if (missingKey || !request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 25 });
    }

    const { payment_id, uuid } = requestData;

    const sanitizedValues = {
      payment_id: tools.delInjection(payment_id),
      token: tools.delInjection(request.headers.authorization),
      uuid: tools.delInjection(uuid),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 25.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 25.3,
            });
          } else {
            database.query(
              `SELECT * FROM \`payments\` WHERE id='${sanitizedValues.payment_id}';`,
              (error, rows_payment) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 25.6 });
                }

                if (rows_payment.length < 1) {
                  return response.status(500).json({
                    error: "Заявка на платеж не найдена",
                    bcode: 25.7,
                  });
                } else {
                  database.query(
                    `UPDATE \`payments\` SET \`status\` = '1' WHERE \`id\` = ${sanitizedValues.payment_id};`,
                    (error, rows) => {
                      if (error) {
                        return response
                          .status(500)
                          .json({ error: "Ошибка на сервере", bcode: 25.4 });
                      }

                      database.query(
                        `UPDATE \`orders\` SET \`status\` = '0', \`uuid_sdek\` = '${sanitizedValues.uuid}' WHERE \`id\` = ${rows_payment[0].order_id};`,
                        (error, rows) => {
                          if (error) {
                            return response.status(500).json({
                              error: "Ошибка на сервере",
                              bcode: 25.5,
                            });
                          }

                          response.json({ message: "Оплата принята" });
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 25.2 });
        }
      }
    );
  }

  async addPromocode(request, response) {
    const requiredKeys = ["promocode", "persent", "date_end"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey || !request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 26 });
    }

    const { promocode, persent, date_end } = requestData;

    const sanitizedValues = {
      token: tools.delInjection(request.headers.authorization),
      promocode: tools.delInjection(promocode),
      persent: tools.delInjection(persent),
      date_end: tools.delInjection(date_end),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 26.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 26.3,
            });
          } else {
            database.query(
              `INSERT INTO \`promo\` (\`promocode\`, \`persent\`, \`date_end\`) VALUES ('${sanitizedValues.promocode}', '${sanitizedValues.persent}', '${date_end}');`,
              (error, rows) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 26.4 });
                }

                response.json({
                  promocode: sanitizedValues.promocode,
                  persent: sanitizedValues.persent,
                  date_end: sanitizedValues.date_end,
                });
              }
            );
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 26.2 });
        }
      }
    );
  }

  async getAllPromocodes(request, response) {
    const requiredKeys = ["token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 27 });
    }

    const { token } = requestData;

    const sanitizedValues = {
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 27.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав",
              bcode: 26.3,
            });
          } else {
            database.query(`SELECT * FROM \`promo\``, (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 27.3 });
              }

              response.json(rows);
            });
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 27.2 });
        }
      }
    );
  }

  async checkPromocode(request, response) {
    const requiredKeys = ["token", "promocode"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 28 });
    }

    const { token, promocode } = requestData;

    const sanitizedValues = {
      promocode: tools.delInjection(promocode),
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 28.1 });
        }

        if (rows.length == 1) {
          database.query(
            `SELECT * FROM \`promo\` WHERE promocode='${sanitizedValues.promocode}'`,
            (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 28.1 });
              }

              if (rows.length == 1) {
                if (rows[0].date_end < Date.now()) {
                  const formatted_date = date_correct.format(
                    rows[0].date_end,
                    "dd.MM.yyyy HH:mm:ss"
                  );

                  response.json({
                    message: `Действие промокода истекло ${formatted_date}.`,
                    status: 0,
                    date_end_text: formatted_date,
                    date_end_timestamp: rows[0].date_end,
                    persent: rows[0].persent,
                  });
                } else {
                  const formatted_date = date_correct.format(
                    rows[0].date_end,
                    "dd.MM.yyyy HH:mm:ss"
                  );

                  response.json({
                    message: `Промокод действителен до ${formatted_date}.`,
                    status: 1,
                    date_end_text: formatted_date,
                    date_end_timestamp: rows[0].date_end,
                    persent: rows[0].persent,
                  });
                }
              } else {
                return response
                  .status(400)
                  .json({ error: "Промокод не найден", bcode: 28.2 });
              }
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 28.2 });
        }
      }
    );
  }

  async changeBasicInfo(request, response) {
    const requiredKeys = [
      "new_email",
      "new_country",
      "new_date_of_birth",
      "new_number_tel",
    ];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey || !request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 31 });
    }

    const { new_email, new_country, new_date_of_birth, new_number_tel } =
      requestData;

    const sanitizedValues = {
      new_country: tools.delInjection(new_country),
      new_date_of_birth: tools.delInjection(new_date_of_birth),
      new_number_tel: tools.delInjection(new_number_tel),
      new_email: tools.delInjection(new_email),
      token: tools.delInjection(request.headers.authorization),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 31.1 });
        }

        if (rows.length == 1) {
          if (sanitizedValues.new_country !== "") {
            database.query(
              `UPDATE \`users\` SET \`country\` = '${sanitizedValues.new_country}' WHERE \`token\` = '${sanitizedValues.token}';`,
              (error, rows) => {
                if (error) {
                  log("Error 31.2 ");
                }
              }
            );
          }

          if (sanitizedValues.new_date_of_birth !== "") {
            database.query(
              `UPDATE \`users\` SET \`date_of_birth\` = '${sanitizedValues.new_date_of_birth}' WHERE \`token\` = '${sanitizedValues.token}';`,
              (error, rows) => {
                if (error) {
                  log("Error 31.3");
                }
              }
            );
          }

          if (sanitizedValues.new_number_tel !== "") {
            database.query(
              `UPDATE \`users\` SET \`number_tel\` = '${sanitizedValues.new_number_tel}' WHERE \`token\` = '${sanitizedValues.token}';`,
              (error, rows) => {
                if (error) {
                  log("Error 31.5");
                }
              }
            );
          }
          if (sanitizedValues.new_email !== "") {
            database.query(
              `UPDATE \`users\` SET \`email\` = '${sanitizedValues.new_email}' WHERE \`token\` = '${sanitizedValues.token}';`,
              (error, rows) => {
                if (error) {
                  log("Error 31.6");
                }
              }
            );
          }

          return response.json({ message: "Успех" });
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа", bcode: 31.4 });
        }
      }
    );
  }

  async changeDelivery(request, response) {
    try {
      const requiredKeys = ["new_delivery"];

      const requestData = request.body;

      const missingKey = requiredKeys.find(
        (key) => !requestData.hasOwnProperty(key)
      );
      if (missingKey || !request.headers.hasOwnProperty('authorization')) {
        return response
          .status(400)
          .json({ error: "Некорректные данные", bcode: 32 });
      }

      const { token, new_delivery } = requestData;

      const sanitizedValues = {
        new_delivery: JSON.parse(new_delivery),
        token: tools.delInjection(request.headers.authorization),
      };

      database.query(
        `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
        (error, rows, fields) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 32.1 });
          }

          if (rows.length == 1) {
            database.query(
              `UPDATE \`users\` SET \`adress_delivery\` = '${JSON.stringify(
                sanitizedValues.new_delivery
              )}' WHERE \`token\` = '${sanitizedValues.token}';`,
              (error, rows) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 32.3 });
                }

                response.json({
                  adress_delivery: sanitizedValues.new_delivery,
                });
              }
            );
          } else {
            return response
              .status(400)
              .json({ error: "Ошибка доступа", bcode: 32.2 });
          }
        }
      );
    } catch {
      return response
        .status(400)
        .json({ error: "Незвестная ошибка", bcode: 32.11111 });
    }
  }

  async createReview(request, response) {
    try {
      const requiredKeys = ["rating", "text", "product_id", "anon"];

      const requestData = request.body;

      const missingKey = requiredKeys.find(
        (key) => !requestData.hasOwnProperty(key)
      );
      if (missingKey || !request.headers.hasOwnProperty('authorization')) {
        return response
          .status(400)
          .json({ error: "Некорректные данные", bcode: 33 });
      }

      const { rating, text, product_id, anon } = requestData;

      const sanitizedValues = {
        token: tools.delInjection(request.headers.authorization),
        rating: tools.delInjection(rating),
        text: tools.delInjection(text),
        product_id: tools.delInjection(product_id),
        anon: tools.delInjection(anon),
      };

      database.query(
        `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
        (error, rows_user, fields) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 33.1 });
          }

          if (rows_user.length == 1) {
            if (sanitizedValues.rating > 5) {
              return response
                .status(500)
                .json({ error: "Оценка не может быть выше 5", bcode: 33.8 });
            }

            database.query(
              `SELECT * FROM \`reviews\` WHERE author_id=${rows_user[0].id};`,
              (error, rows_r) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 33.6 });
                }

                if (rows_r.length === 0) {
                  database.query(
                    `SELECT * FROM \`products\` WHERE id=${sanitizedValues.product_id};`,
                    (error, rows_product) => {
                      if (error) {
                        return response
                          .status(500)
                          .json({ error: "Ошибка на сервере", bcode: 33.4 });
                      }

                      if (rows_product.length == 1) {
                        database.query(
                          `INSERT INTO \`reviews\` (\`author_id\`, \`first_name\`, \`last_name\`, \`rating\`, \`text\`, \`product_id\`, \`date_timestamp\`, \`anon\`) VALUES ('${
                            rows_user[0]["id"]
                          }', '${rows_user[0]["first_name"]}', '${
                            rows_user[0]["last_name"]
                          }', '${sanitizedValues.rating}', '${
                            sanitizedValues.text
                          }', '${
                            sanitizedValues.product_id
                          }', '${Date.now()}', '${sanitizedValues.anon}');`,
                          (error, rows_review) => {
                            if (error) {
                              return response.status(500).json({
                                error: "Ошибка на сервере",
                                bcode: 33.3,
                                
                              });
                            }
                            response.json({
                              author_first_name: rows_user[0].first_name,
                              author_last_name: rows_user[0].last_name,
                              product_id: rows_product[0].id,
                              set_rating: sanitizedValues.rating,
                              product_title: rows_product[0].title,
                              anon: sanitizedValues.anon,
                              text: sanitizedValues.text,
                            });
                          }
                        );
                      } else {
                        return response
                          .status(500)
                          .json({ error: "Товар не найден", bcode: 33.5 });
                      }
                    }
                  );
                } else {
                  return response.status(400).json({
                    error: "Нельзя создать больше 1 отзыва на товар",
                    bcode: 33.7,
                  });
                }
              }
            );
          } else {
            return response
              .status(400)
              .json({ error: "Ошибка доступа", bcode: 33.2 });
          }
        }
      );
    } catch {
      return response
        .status(400)
        .json({ error: "Неизвестная ошибка", bcode: 33.11111 });
    }
  }

  async getReviewsForProductId(request, response) {
    const requiredKeys = ["product_id"];

    const requestData = request.query;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey || !request.headers.hasOwnProperty('authorization')) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 34 });
    }

    const { product_id } = requestData;

    const sanitizedValues = {
      token: tools.delInjection(request.headers.authorization),
      product_id: tools.delInjection(product_id),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows_user, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 34.2 });
        }

        if (rows_user.length < 1) {
          return response
            .status(500)
            .json({ error: "Ошибка доступа", bcode: 34.3 });
        } else {
          database.query(
            `SELECT * FROM \`reviews\` WHERE product_id='${sanitizedValues.product_id}';`,
            (error, rows) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 34.1 });
              }

              let all_ratings = 0;

              for (let i = 0; rows.length > i; i++) {
                if (rows[i].anon === 1) {
                  rows[i].author_id = -1;
                  rows[i].first_name = "";
                  rows[i].last_name = "";
                }
                all_ratings += rows[i].rating;
              }

              response.json({
                items: rows,
                average_rating: all_ratings / rows.length,
              });
            }
          );
        }
      }
    );
  }

  async getReviewsFromAuthor(request, response) {
    const requiredKeys = ["authorization"];

    const requestData = request.headers;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 35 });
    }

    const { authorization } = requestData;

    const sanitizedValues = {
      token: tools.delInjection(authorization),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows_user, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 35.2 });
        }

        if (rows_user.length < 1) {
          return response
            .status(500)
            .json({ error: "Ошибка доступа", bcode: 35.3 });
        } else {
          database.query(
            `SELECT * FROM \`reviews\` WHERE author_id='${rows_user[0].id}';`,
            (error, rows) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 35.1 });
              }

              response.json({
                rows,
              });
            }
          );
        }
      }
    );
  }

  async changeUserName(request, response) {
    if (
      !request.headers.hasOwnProperty("authorization") ||
      !request.body.hasOwnProperty("first_name") ||
      !request.body.hasOwnProperty("last_name")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные", bcode: 36 });
    }

    const token = tools.delInjection(request.headers.authorization)
    const first_name = tools.delInjection(request.body.first_name)
    const last_name = tools.delInjection(request.body.last_name)

    database.query(`SELECT * FROM \`users\` WHERE token='${token}';`, (error, rows) => {
      if (error) {
        return response
          .status(500)
          .json({ error: "Ошибка на сервере", bcode: 36.1 });
      }

      if (rows.length !== 1) {
        return response
          .status(500)
          .json({ error: "Ошибка доступа", bcode: 36.2 });
      } else {
        database.query(`UPDATE \`users\` SET first_name = '${first_name}', last_name = '${last_name}' WHERE token='${token}';`, (error, rows) => {
          if (error) {
            return response
              .status(500)
              .json({ error: "Ошибка на сервере", bcode: 36.3 });
          }

          response.json({message: 'Успех', items: {first_name: first_name, last_name: last_name}})
        })
      }
    })
  }
}

export default new ApiPostController();
