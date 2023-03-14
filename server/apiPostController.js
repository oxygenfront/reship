import tools from './tools.js';
import database from './database.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const url = 'http://localhost:5000';

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: 'semenov2denis2@gmail.com',
    pass: 'omichfgzqsquprgo',
  },
  secure: true,
});

class ApiPostController {
  async registration(request, response) {
    if (
      !tools.checkJsonKey(request.body, 'first_name') ||
      !tools.checkJsonKey(request.body, 'last_name') ||
      !tools.checkJsonKey(request.body, 'password') ||
      !tools.checkJsonKey(request.body, 'email')
    ) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 1 });
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
            .json({ error: 'Ошибка на сервере', bcode: 1.1 });
        }

        if (rows.length == 0) {
          let new_token = 'reship.api.' + tools.createToken(50);

          database.query(
            'INSERT INTO `users` (`first_name`, `last_name`, `email`, `avatar`, `adress_delivery`, `basket`, `token`, `date_register_timestamp`, `password_md5`, `email_active`) VALUES ' +
              `('${first_name}', '${last_name}', '${email}', 'https://placehold.co/600x400', '', '', '${new_token}', '${Date.now()}', '${crypto
                .createHash('md5')
                .update(password)
                .digest('hex')}', '0');`,
            (error, rows, fields) => {
              if (error) {
                return response
                  .status(500)
                  .json({ error: 'Ошибка на сервере', bcode: 1.2 });
              }

              let activation_code = tools.createToken(50);

              let mailData = {
                from: '[RESHIP] Активация аккаунта',
                to: email,
                subject: '[RESHIP] Активация аккаунта',
                text:
                  `Активируйте аккаунт по ссылке: ${url}/api/activateEmail?code=` +
                  activation_code,
                // html: '<b>Hey there! </b><br
              };

              transporter.sendMail(mailData, function (err, info) {
                if (err) {
                  return response.status(400).json({
                    error: 'Указана несуществующая почта.',
                    bcode: 1.3,
                  });
                } else {
                  database.query(
                    "INSERT INTO `activate_email` (`email`, `code`) VALUES ('" +
                      email +
                      "', '" +
                      activation_code +
                      "');",
                    (error, rows, fields) => {
                      if (error) {
                        return response
                          .status(500)
                          .json({ error: 'Ошибка на сервере', bcode: error });
                      }

                      return response.status(400).json({ token: new_token });
                    }
                  );
                }
              });
            }
          );
        } else {
          return response
            .status(400)
            .json({ error: 'Данная электронная почта занята.', bcode: 1.5 });
        }
      }
    );
  }

  async getProducts(request, response) {
    if (!tools.checkJsonKey(request.query, 'category')) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 2 });
    }

    let category = tools.delInjection(request.query.category);

    let sql = ' WHERE category="' + category + '"';

    if (category === 'none') sql = '';

    database.query('SELECT * FROM `products`' + sql, (error, rows, fields) => {
      if (error) {
        return response
          .status(500)
          .json({ error: 'Ошибка на сервере', bcode: 2.1 });
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

  async auth(request, response) {
    if (
      !tools.checkJsonKey(request.body, 'email') ||
      !tools.checkJsonKey(request.body, 'password')
    ) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 3 });
    }

    let password = tools.delInjection(request.body.password);
    let email = tools.delInjection(request.body.email);

    database.query(
      "SELECT * FROM `users` WHERE email='" +
        email +
        "' AND password_md5='" +
        crypto.createHash('md5').update(password).digest('hex') +
        "'",
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 3.1 });
        }

        if (rows.length == 1) {
          return response.json({ token: rows[0].token });
        } else {
          return response
            .status(400)
            .json({ error: 'Неверный логин или пароль.', bcode: 3.2 });
        }
      }
    );
  }

  async getUser(request, response) {
    if (!tools.checkJsonKey(request.body, 'token')) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 4 });
    }

    let token = tools.delInjection(request.body.token);

    database.query(
      "SELECT * FROM `users` WHERE token='" + token + "'",
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 4.1 });
        }

        if (rows.length == 1) {
          let response_json = {
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            email: rows[0].email,
            avatar: rows[0].avatar,
            adress_delivery: rows[0].adress_delivery,
            date_register_timestamp: rows[0].date_register_timestamp,
          };

          return response.json(response_json);
        } else {
          return response.status(400).json({ error: 'ашалеть', bcode: 4.2 });
        }
      }
    );
  }

  async changePassword(request, response) {
    if (
      !tools.checkJsonKey(request.body, 'password') ||
      !tools.checkJsonKey(request.body, 'new_password') ||
      !tools.checkJsonKey(request.body, 'token')
    ) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 5 });
    }

    let password = tools.delInjection(request.body.password);
    let new_password = tools.delInjection(request.body.new_password);
    let token = tools.delInjection(request.body.token);

    database.query(
      "SELECT * FROM `users` WHERE token='" +
        token +
        "' AND password_md5='" +
        crypto.createHash('md5').update(password).digest('hex') +
        "'",
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 5.1 });
        }

        if (rows.length == 1) {
          let new_token = 'reship.api.' + tools.createToken(50);

          database.query(
            "UPDATE `users` SET `password_md5` = '" +
              crypto.createHash('md5').update(new_password).digest('hex') +
              "' WHERE token='" +
              token +
              "';"
          );
          database.query(
            "UPDATE `users` SET `token` = '" +
              new_token +
              "' WHERE token='" +
              token +
              "';"
          );

          return response.json({ token: new_token });
        } else {
          return response
            .status(400)
            .json({ error: 'Неверный пароль.', bcode: 5.2 });
        }
      }
    );
  }

  async changeEmail(request, response) {
    if (
      !tools.checkJsonKey(request.body, 'password') ||
      !tools.checkJsonKey(request.body, 'new_email') ||
      !tools.checkJsonKey(request.body, 'token')
    ) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 6 });
    }

    let password = tools.delInjection(request.body.password);
    let new_email = tools.delInjection(request.body.new_email);
    let token = tools.delInjection(request.body.token);

    database.query(
      "SELECT * FROM `users` WHERE token='" +
        token +
        "' AND password_md5='" +
        crypto.createHash('md5').update(password).digest('hex') +
        "'",
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 6.1 });
        }

        if (rows.length == 1) {
          let new_token = 'reship.api.' + tools.createToken(50);

          database.query(
            "UPDATE `users` SET `email` = '" +
              new_email +
              "' WHERE token='" +
              token +
              "';"
          );
          database.query(
            "UPDATE `users` SET `token` = '" +
              new_token +
              "' WHERE token='" +
              token +
              "';"
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response
            .status(400)
            .json({ error: 'Неверный пароль.', bcode: 6.2 });
        }
      }
    );
  }

  async changeEmail(request, response) {
    if (
      !tools.checkJsonKey(request.body, 'password') ||
      !tools.checkJsonKey(request.body, 'new_email') ||
      !tools.checkJsonKey(request.body, 'token')
    ) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 6 });
    }

    let password = tools.delInjection(request.body.password);
    let new_email = tools.delInjection(request.body.new_email);
    let token = tools.delInjection(request.body.token);

    database.query(
      "SELECT * FROM `users` WHERE token='" +
        token +
        "' AND password_md5='" +
        crypto.createHash('md5').update(password).digest('hex') +
        "'",
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 6.1 });
        }

        if (rows.length == 1) {
          let new_token = 'reship.api.' + tools.createToken(50);

          database.query(
            "UPDATE `users` SET `email` = '" +
              new_email +
              "' WHERE token='" +
              token +
              "';"
          );
          database.query(
            "UPDATE `users` SET `token` = '" +
              new_token +
              "' WHERE token='" +
              token +
              "';"
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response
            .status(400)
            .json({ error: 'Неверный пароль.', bcode: 6.2 });
        }
      }
    );
  }

  async activateEmail(request, response) {
    if (!tools.checkJsonKey(request.query, 'code')) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 7 });
    }

    let code = tools.delInjection(request.query.code);

    database.query(
      "SELECT * FROM `activate_email` WHERE code='" + code + "'",
      (error, rows_email, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 7.1 });
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
                  .json({ error: 'Ошибка на сервере', bcode: 7.2 });
              }

              database.query(
                "DELETE FROM `activate_email` WHERE email='" +
                  rows_email[0].email +
                  "';",
                (error, rows, fields) => {
                  if (error) {
                    return response
                      .status(500)
                      .json({ error: 'Ошибка на сервере', bcode: 7.3 });
                  }

                  return response.redirect('/');
                }
              );
            }
          );
        } else {
          // return response.status(400).json({'error': 'Активация не требуется', 'bcode': 7.4})
          return response.redirect('/');
        }
      }
    );
  }

  async recoveryPassword(request, response) {
    if (!tools.checkJsonKey(request.body, 'email')) {
      return response
        .status(400)
        .json({ error: 'Некорректные данные.', bcode: 8 });
    }

    let email = tools.delInjection(request.body.email);

    database.query(
      "SELECT * FROM `users` WHERE email='" + email,
      (error, rows, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ error: 'Ошибка на сервере', bcode: 8.1 });
        }

        if (rows.length == 1) {
          let new_token = 'reship.api.' + tools.createToken(50);

          database.query(
            "UPDATE `users` SET `email` = '" +
              new_email +
              "' WHERE token='" +
              token +
              "';"
          );
          database.query(
            "UPDATE `users` SET `token` = '" +
              new_token +
              "' WHERE token='" +
              token +
              "';"
          );

          return response.json({ token: new_token, email: new_email });
        } else {
          return response.status(400).json({
            error: 'Пользователя с данной эл. почтой не найден.',
            bcode: 8.2,
          });
        }
      }
    );
  }
}

export default new ApiPostController();
