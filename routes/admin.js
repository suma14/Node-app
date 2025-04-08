const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

//const rootDir = require("../util/path");

const router = express.Router();

//const products = [];

//  /admin/add-product =>GET
router.get(
  "/add-product",
  productsController.getAddProduct
  // any routes that starts with slash for eg: /addproduct
  // console.log("in another middleware");

  // res.sendFile(path.join(rootDir, "views", "add-product.html")); //sending response
);

// /admin/add-product =>POST
router.post(
  "/add-product",
  productsController.postAddProduct
  //console.log(req.body);
);

//module.exports = router;

module.exports = router;
// exports.routes = router;
// exports.products = products;
