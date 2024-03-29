import Router from "express";
import apiPostController from "./apiPostController.js";
import multer from "multer";
import database from "./database.js";
import tools from "./tools.js";
import fs from "fs";

const tokenNull = new multer.MulterError("01", "Некорректные данные");
const errorAuth = new multer.MulterError("02", "Ошибка доступа");
const errorMysql = new multer.MulterError("03", "Ошибка на сервере");

const storage_user_avatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/assets/user_img/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "reship-" +
        file.originalname.split(".")[0] +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const upload_user_avatar = multer({
  storage: storage_user_avatar,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (typeof req.query.token == "undefined") {
      return cb(tokenNull);
    }

    database.query(
      `SELECT * FROM \`users\` WHERE token='${tools.delInjection(
        req.query.token
      )}'`,
      (error, rows, fields) => {
        if (error) {
          return cb(errorMysql);
        }
        if (rows.length == 1) {
          if (rows[0].avatar !== '/client/public/assets/user_img/default.jpg'){
            fs.unlink("." + rows[0].avatar, (err) => {});
          }
          database.query(
            `UPDATE \`users\` SET \`avatar\` = '/client/public/assets/user_img/${
              "reship-" +
              file.originalname.split(".")[0] +
              "." +
              file.originalname.split(".")[1]
            }' WHERE \`id\`=${rows[0].id};`,
            (error, rows_, fields) => {
              if (error) {
                return cb(errorMysql);
              }
              return cb(null, true);
            }
          );
        } else {
          return cb(errorAuth);
        }
      }
    );
  },
});

const router = Router();

// user
router.post("/registration", apiPostController.registration);
router.post("/auth", apiPostController.auth);
router.get("/getProducts", apiPostController.getProducts);
router.get("/getProductsAll", apiPostController.getProductsAll);
router.get("/getProductById/:id", apiPostController.getProductById);
router.get("/getUser", apiPostController.getUser);
router.post("/changePassword", apiPostController.changePassword);
router.post("/changeEmail", apiPostController.changeEmail);
router.get("/activateEmail", apiPostController.activateEmail);
router.post("/recoveryPassword", apiPostController.recoveryPassword);
router.post("/addFavorites", apiPostController.addFavorites);
router.post("/deleteFavorites", apiPostController.deleteFavorites);
router.post("/createOrder", apiPostController.createOrder);
router.get("/getOrdersByCustomerId", apiPostController.getOrdersByCustomerId);
router.get("/getOrder", apiPostController.getOrder);
router.post("/checkPromocode", apiPostController.checkPromocode);
router.post("/changeBasicInfo", apiPostController.changeBasicInfo);
router.post("/changeUserName", apiPostController.changeUserName);
router.post("/changeDelivery", apiPostController.changeDelivery);
router.post("/createReview", apiPostController.createReview);
router.get("/getReviewsForProductId", apiPostController.getReviewsForProductId);
router.get("/getReviewsFromAuthor", apiPostController.getReviewsFromAuthor);
router.get("/getPreviewPriceOrder", apiPostController.getPreviewPriceOrder);
router.post(
  "/changeAvatar",
  apiPostController.changeAvatar
);

// admin
router.post("/createProduct", apiPostController.createProduct);
router.post("/createSwitch", apiPostController.createSwitch);
router.post("/changeProduct", apiPostController.changeProduct);
router.post("/deleteProduct", apiPostController.deleteProduct);
router.post("/acceptPayment", apiPostController.acceptPayment);
router.post("/addPromocode", apiPostController.addPromocode);
router.get("/getOrdersAll", apiPostController.getOrdersAll);
router.get("/getSwitches", apiPostController.getSwitches);
router.post("/getAllPromocodes", apiPostController.getAllPromocodes);
router.get("/getPayments", apiPostController.getPayments);

export default router;
