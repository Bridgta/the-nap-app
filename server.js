var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
var Location = require("./models/location");
var Comment = require("./models/comment");
var User = require("./models/user");
require("dotenv").config();
// const seedDB = require("./seeds");

const commentRoutes = require("./routes/comments");
const locationRoutes = require("./routes/locations");
const indexRoutes = require("./routes/index");
require("./config/database");

const app = express();

//view engine set up
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride("_method"));
// seedDB();

//PAssport Config

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/locations", locationRoutes);
app.use("/locations/:id/comments", commentRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT, function() {
  console.log(`Listening on ${process.env.PORT}`);
});

module.exports = app;
