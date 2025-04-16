const Product = require("../models/product.js"); //since its a class make it capital
const Cart = require("../models/cart");
// exports.getAddProduct = (req, res, next) => {
//   res.render("admin/add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     //formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true,
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const product = new Product(req.body.title);
//   product.save();
//   //products.push({ title: req.body.title });
//   res.redirect("/");
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
    // console.log("shop.js", adminData.products);
    // //console.log("in this middleware");
    // res.sendFile(path.join(rootDir, "views", "shop.html")); //adding path to the other filea in this directory
    // res.render("shop", {
    //   prods: products,
    //   pageTitle: "shop",
    //   path: "/",
    //   hasProducts: products.length > 0,
    //   activeShop: true,
    //   productCSS: true,
    //layout: false,
  }); // it will directly look for default engines here 'pug'
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //dynamic route   // gives all the deayils that is gives the JSON file
  //console.log(prodId);
  Product.findById(prodId, (product) => {
    //console.log(product);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
  //res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "shop",
      path: "/",
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  //console.log(prodId);
  Product.findById(prodId, (product) => {
    //console.log(product.price);
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
  //res.render("");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
