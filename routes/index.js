var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root router <3

router.get("/", function(req, res) {
  res.render("welcome.ejs");
});

module.exports = router;
