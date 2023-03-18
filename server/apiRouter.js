import Router from "express";
import apiPostController from "./apiPostController.js";

const router = Router();

router.post('/registration', apiPostController.registration)
router.post('/auth', apiPostController.auth)
router.get('/getProducts', apiPostController.getProducts)
router.get('/getProductsAll', apiPostController.getProductsAll)
router.get('/getProductById/:id', apiPostController.getProductById)
router.get('/getUser', apiPostController.getUser)
router.post('/changePassword', apiPostController.changePassword)
router.post('/changeEmail', apiPostController.changeEmail)
router.get('/activateEmail', apiPostController.activateEmail)
router.post('/recoveryPassword', apiPostController.recoveryPassword)

export default router;