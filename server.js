const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nap_app");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
const locationsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Location = mongoose.model("Location", locationsSchema);

app.get("/", function(req, res) {
  res.render("welcome");
});

//INDEX - show all locations
app.get("/locations", function(req, res) {
  Location.find({}, function(err, allLocations) {
    if (err) {
      console.log(err);
    } else {
      res.render.apply("index", { locations: allLocations });
    }
  });
});

//Create - create all locations
app.post("/locations", function(req, res) {
  // get data from form and add to locations array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newLocation = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Location.create(newLocation, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/locations");
    }
  });
});

//NEW
app.get("/locations/new", function(req, res) {
  res.render("new.ejs");
});

//SHOW - shows more info about a location
app.get("/locations/:id", function(req, res) {
  //find the campground with provided ID
  Location.findById(req.params.id, function(err, foundLocation) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { location: foundLocation });
    }
  });
});

app.listen(3000, function() {
  console.log("The Nap App Server is Now Sleep Walking!");
});
