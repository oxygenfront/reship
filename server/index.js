import express from "express";
import cors from "cors";
import apiRouter from "./apiRouter.js";
import bodyParser from 'body-parser';

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

app.use((request, response) => {
    response.status(404).json({'error': "Страница не найдена."})
})

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
});