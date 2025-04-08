const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    //formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // console.log("shop.js", adminData.products);
  // //console.log("in this middleware");
  // res.sendFile(path.join(rootDir, "views", "shop.html")); //adding path to the other filea in this directory
  res.render("shop", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    //layout: false,
  }); // it will directly look for default engines here 'pug'
};
