const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get("Cookie").split("=")[1] === "true"; //extracting the true value by checking it with console and inspecting
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //req.isLoggedIn = true;
  //res.setHeader("Set-Cookie", "loggedIn=true", "HttpOnly");
  User.findById("686ea704af0cdc13c692f81e")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user; // mongoose //requesting session object here // we share it across requests. not just sinle request
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
      // res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
