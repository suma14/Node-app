const http = require("http");
const path = require("path");
const express = require("express");
//const routes = require("./routes");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error.js");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

//const { create } = require("express-handlebars");

const app = express();

// const hbs = create({
//   layoutsDir: "views/layouts/",
//   defaultLayout: "main-layout",
//   extname: "handlebars",
// });
// app.engine("handlebars", hbs.engine);

// const expressHbs = require("express-handlebars");

// const app = express();

// app.engine(
//   "handlebars",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "handlebars",
//   })
// );
app.set("view engine", "ejs");
//app.set("view engine", "pug"); //Global configuration value,
app.set("views", "views"); // Now we are telling express that we want to compile dynamic templates with the pug engine/ handlebars engine and where to find these templates.
//const adminRoutes = require("./routes/admin");
const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

//testing code for database
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use((req, res, next) => {
//   console.log("in the middleware");
//   next(); // allows the request to continue to the next middleware in line
// }); // adds middleware function

app.use(bodyParser.urlencoded({ extented: false }));
app.use(express.static(path.join(__dirname, "public"))); //now users should be able to access the public path

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); //for incoming requests only
});

//app.use("/admin", adminRoutes);

//app.use(adminRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(
  //(req, res, next) => {
  //   // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  //   res.status(404).render("404", { pageTitle: "Page Not Found" });
  // }
  errorController.get404
);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Associations in sequelize
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
    //app.listen(3001);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "suma", email: "suma@gmail.com" });
    }
    //return Promise.resolve(user);
    return user;
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/add-product", (req, res, next) => {
//   // any routes that starts with slash for eg: /addproduct
//   console.log("in another middleware");
//   res.send(
//     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   ); //sending response
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.use("/", (req, res, next) => {
//   console.log("in this middleware");
//   res.send("<h1>Hello from express</h1>"); //sending response
// });

//console.log(routes.someText);

// const server = http.createServer(routes.handler); // ananomous function

// app.listen(3001); // it calls http create server and passes itself
// const server = http.createServer(app);
// server.listen(3001);
