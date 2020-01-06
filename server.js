const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStategy = require("passport-local");
const Location = require("./models/location");
const User = require("./models/user");
const Comment = require("./models/comment");
// seedDB = require("./seeds");
require("./config/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

//PAssport Config

app.use(
  require("express-session")({
    secret: "Vanilla is better than chocolate",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// //Root Route
// app.get("/", function(req, res) {
//   res.render("welcome");
// });

/////////////////COMMENST

////AUTHH RPUTES

app.get("/signup", function(req, res) {
  res.render("signup");
});

//handle sign in logic
app.post("/signup", function(req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/locations");
    });
  });
});

///log in form
app.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/locations",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logic route

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/locations");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthentcated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function() {
  console.log("The Nap App Server is Now Sleep Walking!");
});
