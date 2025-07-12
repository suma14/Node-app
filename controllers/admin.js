// const mongodb = require("mongodb");
const Product = require("../models/product");

// const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user,
    }
    // title,
    // price,
    // description,
    // imageUrl,
    // null,
    // req.user._id
  );
  product
    .save() // now coming from mongoose as we are not defining it.
    // const product = new Product(null, title, imageUrl, description, price);
    // product
    //   .save()
    //   .then(() => {
    //     res.redirect("/");
    //   })
    //   .catch((err) => console.log(err));
    //Now using Sequelize
    // req.user
    //   .createProduct({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //   }) // This createProduct object is already created when the Product model is created.
    //     Product.create(//{
    // //   title: title,
    // //   price: price,
    // //   imageUrl: imageUrl,
    // //   description: description
    // //  // userId: req.user.id,
    // //}
    // )
    .then((result) => {
      //console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user
  //   .getProducts({ where: { id: prodId } })
  //Product.findByPk(prodId)
  Product.findById(prodId)
    .then((product) => {
      //const product = products[0];
      if (!product) {
        return res.rediect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect("/admin/products");
  //In sequelize we save like this
  // Product.findById(prodId)
  //   .then((productData) => {
  // product.title = updatedTitle;
  // product.price = updatedPrice;
  // product.description = updatedDesc;
  // product.imageUrl = updatedImageUrl;
  //   return product.save();
  // })
  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId // no need to add ObjectId here  as we changed in the models
  // );
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
  // req.user
  //   .getProducts()
  //Product.findAll()
  Product.find()
    // .select("title price -_id") //excluding id
    // .populate("userId", "name") // expect name exclude all the details
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("Destroyed Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  //Product.deleteById(prodId);
  //res.redirect("/admin/products");
};
