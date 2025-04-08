const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");
const productsController = require("../controllers/products");

const router = express.Router();

router.get(
  "/",
  productsController.getProducts //(req, res, next) => {
  //   const products = adminData.products;
  //   // console.log("shop.js", adminData.products);
  //   // //console.log("in this middleware");
  //   // res.sendFile(path.join(rootDir, "views", "shop.html")); //adding path to the other filea in this directory
  //   res.render("shop", {
  //     prods: products,
  //     pageTitle: "shop",
  //     path: "/",
  //     hasProducts: products.length > 0,
  //     activeShop: true,
  //     productCSS: true,
  //     //layout: false,
  //   }); // it will directly look for default engines here 'pug'
  // }
);

module.exports = router;
