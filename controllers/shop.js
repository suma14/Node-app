// const Product = require("../models/product.js"); //since its a class make it capital
// const Cart = require("../models/cart");
// // exports.getAddProduct = (req, res, next) => {
// //   res.render("admin/add-product", {
// //     pageTitle: "Add Product",
// //     path: "/admin/add-product",
// //     //formsCSS: true,
// //     productCSS: true,
// //     activeAddProduct: true,
// //   });
// // };

// // exports.postAddProduct = (req, res, next) => {
// //   const product = new Product(req.body.title);
// //   product.save();
// //   //products.push({ title: req.body.title });
// //   res.redirect("/");
// // };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//       // hasProducts: products.length > 0,
//       // activeShop: true,
//       // productCSS: true,
//     });
//     // console.log("shop.js", adminData.products);
//     // //console.log("in this middleware");
//     // res.sendFile(path.join(rootDir, "views", "shop.html")); //adding path to the other filea in this directory
//     // res.render("shop", {
//     //   prods: products,
//     //   pageTitle: "shop",
//     //   path: "/",
//     //   hasProducts: products.length > 0,
//     //   activeShop: true,
//     //   productCSS: true,
//     //layout: false,
//   }); // it will directly look for default engines here 'pug'
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId; //dynamic route   // gives all the deayils that is gives the JSON file
//   //console.log(prodId);
//   Product.findById(prodId, (product) => {
//     //console.log(product);
//     res.render("shop/product-detail", {
//       product: product,
//       pageTitle: product.title,
//       path: "/products",
//     });
//   });
//   //res.redirect("/");
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "shop",
//       path: "/",
//       // hasProducts: products.length > 0,
//       // activeShop: true,
//       // productCSS: true,
//     });
//   });
// };

// exports.getCart = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/cart",
//     pageTitle: "Your cart",
//   });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   //console.log(prodId);
//   Product.findById(prodId, (product) => {
//     //console.log(product.price);
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect("/cart");
//   //res.render("");
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

const Product = require("../models/product");
// const Cart = require("../models/cart");
// const Order=require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // Product.findById(prodId)
  // .then(([product]) => {
  //   res.render("shop/product-detail", {
  //     product: product[0],
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // })
  // .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  //console.log(req.user.cart);
  req.user
    .getCart()
    .then((cart) => {
      //console.log(cart);
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  //console.log(req.user.cart); // We cant get acess to the cart like this.
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        //...increment cart
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  // res.redirect("/cart");
  // });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      // console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
