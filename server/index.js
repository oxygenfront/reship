import express from "express";
import cors from "cors";
import apiRouter from "./apiRouter.js";
import bodyParser from 'body-parser';
import multer from "multer";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.use('/api', (request, response) => {
    response.status(404).json({'api_error': "Метод не найден или указана не полная информация.", 'method': request.originalUrl.split('/')[2]})
})

app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
      res.status(400).send(err);
    } else {
      // Другая ошибка
      console.error('Ошибка:', err);
      next();
    }
  });

app.use((request, response) => {
    response.status(404).json({'error': "Страница не найдена."})
})

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
});