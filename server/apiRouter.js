import Router from "express";
import apiPostController from "./apiPostController.js";

const router = Router();

router.post('/getProducts', apiPostController.getProducts)

export default router;