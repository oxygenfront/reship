import tools from "./tools.js";
import database from "./database.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import date_correct from "date-fns";

const url = "http://localhost:5000";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "semenov2denis2@gmail.com",
    pass: "omichfgzqsquprgo",
  },
  secure: true,
});

class ApiPostController {
  async registration(request, response) {
    if (
      !tools.checkJsonKey(request.body, "first_name") ||
      !tools.checkJsonKey(request.body, "last_name") ||
      !tools.checkJsonKey(request.body, "password") ||
      !tools.checkJsonKey(request.body, "email") ||
      !tools.checkJsonKey(request.body, "adress_delivery") ||
      !tools.checkJsonKey(request.body, "date_of_birth_unix")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 1 });
    }

    let first_name = tools.delInjection(request.body.first_name);
    let last_name = tools.delInjection(request.body.last_name);
    let password = tools.delInjection(request.body.password);
    let email = tools.delInjection(request.body.email);
    let adress_delivery = tools.delInjection(request.body.adress_delivery);
    let date_of_birth_unix = tools.delInjection(request.body.date_of_birth_unix);

    database.query(
      'SELECT * FROM `users` WHERE email="' + email + '"',
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 1.1 });
        }

        if (rows.length == 0) {
          let new_token = "reship.api." + tools.createToken(50);

          database.query(
            "INSERT INTO `users` (`first_name`, `last_name`, `email`, `avatar`, `adress_delivery`, `token`, `date_register_timestamp`, `password_md5`, `email_active`, `favorites`, `admin`, `basket`, `date_of_birth`) VALUES " +
              `('${first_name}', '${last_name}', '${email}', '/client/public/assets/user_img/default.jpg', '${adress_delivery}', '${new_token}', '${Date.now()}', '${crypto
                .createHash("md5")
                .update(password)
                .digest("hex")}', '1', '${JSON.stringify(
                []
              )}', '0', '${JSON.stringify([])}', '${date_of_birth_unix}');`,
            (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 1.2});
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
              //       error: 'Указана несуществующая почта.',
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
              //             .json({ error: 'Ошибка на сервере', bcode: error });
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
            .json({ error: "Данная электронная почта занята.", bcode: 1.5 });
        }
      }
    );
  }

  async getProducts(request, response) {
    let category = null;
    let query = null;

    if (tools.checkJsonKey(request.query, "category")) {
      category = tools.delInjection(request.query.category);
    }

    if (tools.checkJsonKey(request.query, "query")) {
      query = tools.delInjection(request.query.query);
    }

    if (category === query) {
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
          response_json.parameters_avail = JSON.parse(
            response_json.parameters_avail
          );

          response_json_new.push(response_json);
        }

        response.json(response_json_new);
      });

      return;
    }

    database.query(`SELECT * FROM \`products\``, (error, rows, fields) => {
      if (error) {
        return response
          .status(500)
          .json({ error: "Ошибка на сервере", bcode: 2.1 });
      }

      let response_json_new = [];
      let category_true = [];

      for (let i = 0; i < rows.length; i++) {
        if (category !== null) {
          if (rows[i].category === category) {
            category_true.push(rows[i]);
          }
        } else {
          category_true.push(rows[i]);
        }
      }

      for (let i = 0; i < category_true.length; i++) {
        let response_json = category_true[i];

        response_json.colors = JSON.parse(response_json.colors);
        response_json.colors_avail = JSON.parse(response_json.colors_avail);
        response_json.parameters = JSON.parse(response_json.parameters);
        response_json.parameters_avail = JSON.parse(
          response_json.parameters_avail
        );

        if (query === null) {
          response_json_new.push(response_json);
          continue;
        }

        if (response_json.name.includes(query)) {
          response_json_new.push(response_json);
        }
      }

      response.json(response_json_new);
    });
  }

  async auth(request, response) {
    if (
      !tools.checkJsonKey(request.body, "email") ||
      !tools.checkJsonKey(request.body, "password")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 3 });
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
            .json({ error: "Ошибка на сервере", bcode: 3.1 });
        }

        if (rows.length == 1) {
          return response.json({ token: rows[0].token });
        } else {
          return response
            .status(400)
            .json({ error: "Неверный логин или пароль.", bcode: 3.2 });
        }
      }
    );
  }

  async getUser(request, response) {
    if (!tools.checkJsonKey(request.query, "token")) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 4 });
    }

    const token = tools.delInjection(request.query.token);

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
      !tools.checkJsonKey(request.body, "token")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 5 });
    }

    const password = tools.delInjection(request.body.password);
    const new_password = tools.delInjection(request.body.new_password);
    const token = tools.delInjection(request.body.token);

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
          const new_token = "reship.api." + tools.createToken(50);

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
            .json({ error: "Неверный пароль.", bcode: 5.2 });
        }
      }
    );
  }

  async changeEmail(request, response) {
    if (
      !tools.checkJsonKey(request.body, "password") ||
      !tools.checkJsonKey(request.body, "new_email") ||
      !tools.checkJsonKey(request.body, "token")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 6 });
    }

    const password = tools.delInjection(request.body.password);
    const new_email = tools.delInjection(request.body.new_email);
    const token = tools.delInjection(request.body.token);

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
          const new_token = "reship.api." + tools.createToken(50);

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
            .json({ error: "Неверный пароль.", bcode: 6.2 });
        }
      }
    );
  }

  async activateEmail(request, response) {
    if (!tools.checkJsonKey(request.query, "code")) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 7 });
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
        .json({ error: "Некорректные данные.", bcode: 8 });
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
          const new_token = "reship.api." + tools.createToken(50);

          database.query(
            `UPDATE \`users\` SET \`email\` = '${new_email}' WHERE token='${token}';`
          );
          database.query(
            `UPDATE \`users\` SET \`token\` = '${new_token}' WHERE token='${token}';`
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response.status(400).json({
            error: "Пользователя с данной эл. почтой не найден.",
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
        response_json.parameters_avail = JSON.parse(
          response_json.parameters_avail
        );

        response_json_new.push(response_json);
      }

      response.json(response_json_new);
    });
  }

  async createProduct(request, response) {
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
      !tools.checkJsonKey(request.body, "image_link") ||
      !tools.checkJsonKey(request.body, "category") ||
      !tools.checkJsonKey(request.body, "token")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 11 });
    }

    const name = tools.delInjection(request.body.name);
    const description_small = tools.delInjection(
      request.body.description_small
    );
    const description_full = tools.delInjection(request.body.description_full);
    const old_price = tools.delInjection(request.body.old_price);
    const price = tools.delInjection(request.body.price);
    const availability = tools.delInjection(request.body.availability);

    const colors = JSON.parse(request.body.colors);
    const colors_avail = JSON.parse(request.body.colors_avail);
    const parameters = JSON.parse(request.body.parameters);
    const parameters_avail = JSON.parse(request.body.parameters_avail);

    const image_link = tools.delInjection(request.body.image_link);
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
              error: "У вас недостаточно прав.",
              bcode: 11.3,
            });
          } else {
            database.query(
              `INSERT INTO \`products\` (\`name\`, \`description_small\`, \`description_full\`, \`old_price\`, \`price\`, \`availability\`, \`colors\`, \`colors_avail\`, \`parameters\`, \`parameters_avail\`, \`image_link\`, \`category\`) VALUES ('${name}', '${description_small}', '${description_full}', '${old_price}', '${price}', '${availability}', '${JSON.stringify(
                colors
              )}', '${JSON.stringify(colors_avail)}', '${JSON.stringify(
                parameters
              )}', '${JSON.stringify(
                parameters_avail
              )}', '${image_link}', '${category}');`,
              (error, rows, fields) => {
                if (error) {
                  return response
                    .status(500)
                    .json({ error: "Ошибка на сервере", bcode: 11.4 });
                }

                return response.json({ product_id: rows.insertId });
              }
            );
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 11.2 });
        }
      }
    );
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
        .json({ error: "Некорректные данные.", bcode: 12 });
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

      image_link: tools.delInjection(image_link),
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
              error: "У вас недостаточно прав.",
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
            .json({ error: "Ошибка доступа.", bcode: 12.2 });
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
        .json({ error: "Некорректные данные.", bcode: 13 });
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
            error: "Ошибка при удалении товара из БД.",
            bcode: 13.1,
            e: error,
          });
        }

        response.json({ id: sanitizedValues.id });
      }
    );
  }

  async addFavorites(request, response) {
    const requiredKeys = ["product_id", "token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 14 });
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
                      error: "Товар уже находится в избранных.",
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
                      message: "Товар успешно добавлен в избранные.",
                      favorites: new_favorites,
                    });
                  }
                );
              } else {
                return response
                  .status(500)
                  .json({ error: "Товара нет в БД.", bcode: 14.4 });
              }
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 14.2 });
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
        .json({ error: "Некорректные данные.", bcode: 16 });
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
            .json({ error: "Ошибка доступа.", bcode: 16.2 });
        }
      }
    );
  }

  async createOrder(request, response) {
    const requiredKeys = [
      "init",
      "number",
      "email",
      "city",
      "street",
      "number_home",
      "number_flat",
      "postal_code",
      "promocode",
      "basket",
    ];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 17 });
    }

    const {
      init,
      number,
      email,
      city,
      street,
      number_home,
      number_flat,
      postal_code,
      promocode,
      basket,
    } = requestData;

    const sanitizedValues = {
      init: tools.delInjection(init),
      number: tools.delInjection(number),
      email: tools.delInjection(email),
      city: tools.delInjection(city),
      street: tools.delInjection(street),
      number_home: tools.delInjection(number_home),
      number_flat: tools.delInjection(number_flat),
      postal_code: tools.delInjection(postal_code),
      promocode: tools.delInjection(promocode),
      basket: JSON.parse(basket),
    };

    let customer_id = -1;
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
      }
    );

    const basket_json = sanitizedValues.basket;

    if (basket_json.length < 1) {
      return response
        .status(500)
        .json({ error: "В корзине нет товаров", bcode: 17.4 });
    }

    database.query(
      "INSERT INTO `orders` (`init`, `number`, `email`, `city`, `street`, `number_home`, `number_flat`, `postal_code`, `status`, `customer_id`, `date_start`, `date_end`, `products`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '-1', ?, ?, '0', ?)",
      [
        sanitizedValues.init,
        sanitizedValues.number,
        sanitizedValues.email,
        sanitizedValues.city,
        sanitizedValues.street,
        sanitizedValues.number_home,
        sanitizedValues.number_flat,
        sanitizedValues.postal_code,
        customer_id,
        Date.now(),
        JSON.stringify(basket_json),
      ],
      (error, rows_order) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 17.3 });
        }

        database.query(
          `UPDATE \`users\` SET \`basket\` = '[]' WHERE \`id\` = ${customer_id};`,
          (error, rows) => {
            if (error) {
              return response
                .status(400)
                .json({ error: "Ошибка на сервере.", bcode: 17.5 });
            }

            let old_price = 0;
            let full_price = 0;
            for (let i = 0; i < basket_json.length; i++) {
              full_price += basket_json[i].price;
            }

            old_price = full_price;

            database.query(
              `SELECT * FROM \`promo\` WHERE promocode='${sanitizedValues.promocode}'`,
              (error, rows_promo) => {
                if (error) {
                  return response
                    .status(400)
                    .json({ error: "Ошибка на сервере.", bcode: 17.7 });
                }

                let info = {
                  message: "Промокод не использован.",
                  persent: 0,
                  promocode: "",
                };

                if (rows_promo.length == 1) {
                  if (Date.now() < rows_promo[0].date_end) {
                    full_price =
                      full_price - (full_price * rows_promo[0].persent) / 100;
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
                  }', '${full_price}', '${Date.now()}', '0', '${code_payment}');`,
                  (error, rows) => {
                    if (error) {
                      return response.status(400).json({
                        error: "Ошибка на сервере.",
                        bcode: 17.6,
                        e: error,
                      });
                    }

                    response.json({
                      order_id: rows_order.insertId,
                      code_payment: code_payment,
                      old_price: old_price,
                      full_price: full_price,
                      info: info,
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

  async getOrdersByCustomerId(request, response) {
    const requiredKeys = ["customer_id"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 18 });
    }

    const { customer_id } = requestData;

    const sanitizedValues = {
      customer_id: tools.delInjection(customer_id),
    };

    database.query(
      `SELECT * FROM \`orders\` WHERE customer_id='${sanitizedValues.customer_id}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 18.1 });
        }

        for (let i = 0; i < rows.length; i++) {
          rows[i].products = JSON.parse(rows[i].products);
        }

        response.json(rows);
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
        .json({ error: "Некорректные данные.", bcode: 19 });
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
    const requiredKeys = ["token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 20 });
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
            .json({ error: "Ошибка на сервере", bcode: 20.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав.",
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
            .json({ error: "Ошибка доступа.", bcode: 20.2 });
        }
      }
    );
  }

  async addBasket(request, response) {
    const requiredKeys = ["product_id", "token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 21 });
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
            .json({ error: "Ошибка на сервере", bcode: 21.1 });
        }

        if (rows.length == 1) {
          database.query(
            `SELECT * FROM \`products\` WHERE id='${sanitizedValues.product_id}'`,
            (error, rows_product, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 21.5 });
              }

              if (rows_product.length == 1) {
                let basket = JSON.parse(rows[0].basket);

                let search = false;

                for (let i = 0; i < basket.length; i++) {
                  if (basket[i].product_id === sanitizedValues.product_id) {
                    basket[i].count = basket[i].count + 1;
                    basket[i].price = rows_product[0].price;
                    basket[i].full_price =
                      basket[i].full_price + rows_product[0].price;
                    search = true;
                  }
                }

                let new_basket = basket;

                if (!search) {
                  new_basket.push({
                    product_id: sanitizedValues.product_id,
                    name: rows_product[0].name,
                    price: rows_product[0].price,
                    full_price: rows_product[0].price,
                    count: 1,
                  });
                }

                database.query(
                  `UPDATE \`users\` SET \`basket\` = '${JSON.stringify(
                    new_basket
                  )}' WHERE \`token\`='${sanitizedValues.token}';`,
                  (error) => {
                    if (error) {
                      return response
                        .status(500)
                        .json({ error: "Ошибка на сервере", bcode: 21.2 });
                    }

                    response.json({
                      message: "Товар успешно добавлен в корзину.",
                      basket: new_basket,
                    });
                  }
                );
              } else {
                return response
                  .status(500)
                  .json({ error: "Товара нет в БД.", bcode: 21.4 });
              }
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 21.3 });
        }
      }
    );
  }

  async deleteBasket(request, response) {
    const requiredKeys = ["product_id", "token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 23 });
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
            .json({ error: "Ошибка на сервере", bcode: 23.1 });
        }

        if (rows.length == 1) {
          let basket = JSON.parse(rows[0].basket);

          for (let i = 0; i < basket.length; i++) {
            if (basket[i].product_id === sanitizedValues.product_id) {
              if (basket[i].count == 1) {
                basket.splice(i, 1);
                break;
              }
              basket[i].count = basket[i].count - 1;
            }
          }

          let new_basket = basket;

          database.query(
            `UPDATE \`users\` SET \`basket\` = '${JSON.stringify(
              new_basket
            )}' WHERE R\`token\`='${sanitizedValues.token}';`,
            (error) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 23.3 });
              }

              response.json({
                message: "Товар успешно удален из корзины",
                basket: new_basket,
              });
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 23.2 });
        }
      }
    );
  }

  async changeAvatar(request, response) {
    response.json({ success: true, message: "Файл успешно загружен" });
  }

  async getPayments(request, response) {
    const requiredKeys = ["token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 24 });
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
            .json({ error: "Ошибка на сервере", bcode: 24.1 });
        }

        if (rows.length == 1) {
          if (rows[0].admin == 0) {
            return response.json({
              error: "У вас недостаточно прав.",
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
            .json({ error: "Ошибка доступа.", bcode: 24.2 });
        }
      }
    );
  }

  async acceptPayment(request, response) {
    const requiredKeys = ["token", "payment_id", "order_id"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 25 });
    }

    const { token, payment_id, order_id } = requestData;

    const sanitizedValues = {
      payment_id: tools.delInjection(payment_id),
      token: tools.delInjection(token),
      order_id: tools.delInjection(order_id),
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
              error: "У вас недостаточно прав.",
              bcode: 25.3,
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
                  `UPDATE \`orders\` SET \`status\` = '0' WHERE \`id\` = ${sanitizedValues.order_id};`,
                  (error, rows) => {
                    if (error) {
                      return response
                        .status(500)
                        .json({ error: "Ошибка на сервере", bcode: 25.5 });
                    }

                    response.json({ message: "Оплата принята." });
                  }
                );
              }
            );
          }
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 25.2 });
        }
      }
    );
  }

  async addPromocode(request, response) {
    const requiredKeys = ["token", "promocode", "persent", "date_end"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 26 });
    }

    const { token, promocode, persent, date_end } = requestData;

    const sanitizedValues = {
      token: tools.delInjection(token),
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
              error: "У вас недостаточно прав.",
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
            .json({ error: "Ошибка доступа.", bcode: 26.2 });
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
        .json({ error: "Некорректные данные.", bcode: 27 });
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
              error: "У вас недостаточно прав.",
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
            .json({ error: "Ошибка доступа.", bcode: 27.2 });
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
        .json({ error: "Некорректные данные.", bcode: 28 });
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
            .json({ error: "Ошибка доступа.", bcode: 28.2 });
        }
      }
    );
  }

  async changeDateOfBirth(request, response) {
    const requiredKeys = ["token", "new_date_of_birth"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 29 });
    }

    const { token, new_date_of_birth } = requestData;

    const sanitizedValues = {
      new_date_of_birth: tools.delInjection(new_date_of_birth),
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 29.1 });
        }

        if (rows.length == 1) {
          database.query(`UPDATE \`users\` SET \`date_of_birth\` = '${sanitizedValues.new_date_of_birth}' WHERE \`token\` = '${sanitizedValues.token}';`, (error, rows) => {
            if (error) {
              return response
                .status(500)
                .json({ error: "Ошибка на сервере", bcode: 29.3 });
            }

            return response
              .status(400)
              .json({ new_date_of_birth: sanitizedValues.new_date_of_birth });
          })
        }
        else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 29.2 });
        }
      }
    )


  }

  async changeNumberTel(request, response) {
    const requiredKeys = ["token", "new_number_tel"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 30 });
    }

    const { token, new_number_tel } = requestData;

    const sanitizedValues = {
      new_number_tel: tools.delInjection(new_number_tel),
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 30.1 });
        }

        if (rows.length == 1) {
          database.query(`UPDATE \`users\` SET \`number_tel\` = '${sanitizedValues.new_number_tel}' WHERE \`token\` = '${sanitizedValues.token}';`, (error, rows) => {
            if (error) {
              return response
                .status(500)
                .json({ error: "Ошибка на сервере", bcode: 30.3 });
            }

            return response
              .status(400)
              .json({ new_number_tel: sanitizedValues.new_number_tel });
          })
        }
        else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 30.2 });
        }
      }
    )


  }

  async changeCountry(request, response) {
    const requiredKeys = ["token", "new_country"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 31 });
    }

    const { token, new_country } = requestData;

    const sanitizedValues = {
      new_country: tools.delInjection(new_country),
      token: tools.delInjection(token),
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
          database.query(`UPDATE \`users\` SET \`country\` = '${sanitizedValues.new_country}' WHERE \`token\` = '${sanitizedValues.token}';`, (error, rows) => {
            if (error) {
              return response
                .status(500)
                .json({ error: "Ошибка на сервере", bcode: 31.3 });
            }

            return response
              .status(400)
              .json({ new_country: sanitizedValues.new_country });
          })
        }
        else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 31.2 });
        }
      }
    )


  }
}

export default new ApiPostController();
