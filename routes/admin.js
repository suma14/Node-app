const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

//const rootDir = require("../util/path");

const router = express.Router();

//const products = [];

//  /admin/add-product =>GET
router.get(
  "/add-product",
  adminController.getAddProduct
  // any routes that starts with slash for eg: /addproduct
  // console.log("in another middleware");

  // res.sendFile(path.join(rootDir, "views", "add-product.html")); //sending response
);
//  /admin/products =>GET
router.get("/products", adminController.getProducts);

// /admin/add-product =>POST
router.post(
  "/add-product",
  adminController.postAddProduct
  //console.log(req.body);
);

//module.exports = router;
router.get("/edit-product/:productId", adminController.getEditProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;
