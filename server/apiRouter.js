import Router from 'express'
import apiPostController from './apiPostController.js'

const router = Router()

// user
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
router.post('/addFavorites', apiPostController.addFavorites)
router.get('/getFavorites', apiPostController.getFavorites)
router.post('/deleteFavorites', apiPostController.deleteFavorites)
router.post('/createOrder', apiPostController.createOrder)
router.get('/getOrdersByCustomerId', apiPostController.getOrdersByCustomerId)
router.get('/getOrder', apiPostController.getOrder)

// admin
router.post('/createProduct', apiPostController.createProduct)
router.post('/changeProduct', apiPostController.changeProduct)
router.post('/deleteProduct', apiPostController.deleteProduct)
router.get('/getOrdersAll', apiPostController.getOrdersAll)

export default router
