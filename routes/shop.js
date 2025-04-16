const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get(
  "/",
  shopController.getIndex //(req, res, next) => {
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

router.get("/products", shopController.getProducts);

//router.get("/product/delete");
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);
module.exports = router;
