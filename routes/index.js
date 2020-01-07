const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//root router <3

router.get("/", function(req, res) {
  res.render("welcome.ejs");
});

////AUTHH RPUTES

router.get("/signup", function(req, res) {
  res.render("signup");
});

//handle sign in logic
router.post("/signup", function(req, res) {
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
router.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/locations",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logic route

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/locations");
});

module.exports = router;
