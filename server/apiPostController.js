import tools from "./tools.js";
import database from "./database.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const url = "http://localhost:5000";

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
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
      !tools.checkJsonKey(request.body, "email")
    ) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 1 });
    }

    let first_name = tools.delInjection(request.body.first_name);
    let last_name = tools.delInjection(request.body.last_name);
    let password = tools.delInjection(request.body.password);
    let email = tools.delInjection(request.body.email);

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
            "INSERT INTO `users` (`first_name`, `last_name`, `email`, `avatar`, `adress_delivery`, `basket`, `token`, `date_register_timestamp`, `password_md5`, `email_active`, `favorites`, `admin`) VALUES " +
              `('${first_name}', '${last_name}', '${email}', 'https://placehold.co/600x400', '', '', '${new_token}', '${Date.now()}', '${crypto
                .createHash("md5")
                .update(password)
                .digest("hex")}', '1', '${JSON.stringify([])}', '0');`,
            (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере" });
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

    database.query(
      `SELECT * FROM \`users\` WHERE token='${token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 4.1 });
        }

        if (rows.length == 1) {
          const response_json = {
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            email: rows[0].email,
            avatar: rows[0].avatar,
            adress_delivery: rows[0].adress_delivery,
            date_register_timestamp: rows[0].date_register_timestamp,
            admin: rows[0].admin,
            favorites: JSON.parse(rows[0].favorites),
          };

          return response.json(response_json);
        } else {
          return response.status(400).json({ error: "ашалеть", bcode: 4.2 });
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
          const favorites = JSON.parse(rows[0].favorites);

          for (let i = 0; i < favorites.length; i++) {
            if (favorites[i] === sanitizedValues.product_id) {
              return response.status(400).json({
                error: "Товар уже находится в избранных.",
                bcode: 14.4,
              });
            }
          }

          let new_favorites = favorites;
          new_favorites.push(sanitizedValues.product_id);

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
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 14.2 });
        }
      }
    );
  }

  async getFavorites(request, response) {
    const requiredKeys = ["token"];

    const requestData = request.body;

    const missingKey = requiredKeys.find(
      (key) => !requestData.hasOwnProperty(key)
    );
    if (missingKey) {
      return response
        .status(400)
        .json({ error: "Некорректные данные.", bcode: 15 });
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
            .json({ error: "Ошибка на сервере", bcode: 15.1 });
        }

        if (rows.length == 1) {
          const favorites = JSON.parse(rows[0].favorites);

          response.json(favorites);
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 15.2 });
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
          const favorites = JSON.parse(rows[0].favorites);

          let new_favorites = tools.removeItemAll(
            favorites,
            sanitizedValues.product_id
          );

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
      "token",
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
      token,
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
      token: tools.delInjection(token),
    };

    database.query(
      `SELECT * FROM \`users\` WHERE token='${sanitizedValues.token}'`,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Ошибка на сервере", bcode: 17.1 });
        }

        if (rows.length == 1) {
          const customer_id = rows[0].id;

          database.query(
            "INSERT INTO `orders` (`init`, `number`, `email`, `city`, `street`, `number_home`, `number_flat`, `postal_code`, `status`, `customer_id`, `date_start`, `date_end`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, '0')",
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
            ],
            (error, rows) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: "Ошибка на сервере", bcode: 17.3 });
              }

              response.json({ order_id: rows.insertId });
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: "Ошибка доступа.", bcode: 17.2 });
        }
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
}

export default new ApiPostController();
