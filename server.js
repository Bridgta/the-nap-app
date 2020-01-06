const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nap_app");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
var locationsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const locations = mongoose.model("Location", locationSchema);

app.get("/", function(req, res) {
  res.render("welcome");
});

//INDEX - show all locations
app.get("/locations", function(req, res) {
  res.render("locations", { locations: locations });
});

//Create - create all locations
app.post("/locations", function(req, res) {
  // get data from form and add to locations array
  var name = req.body.name;
  var image = req.body.image;
  var newLocation = { name: name, image: image };
  locations.push(newLocation);
  //redirect back to campgrounds page
  res.redirect("/Locations");
});

app.get("/locations/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(3000, function() {
  console.log("The Nap App Server is Now Sleep Walking!");
});
