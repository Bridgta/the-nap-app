var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Location = require("./models/location");
var Comment = require("./models/comment");
// seedDB = require("./seeds");
require("./config/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

app.get("/", function(req, res) {
  res.render("welcome");
});

//INDEX - show all locations
app.get("/locations", function(req, res) {
  Location.find({}, function(err, allLocations) {
    if (err) {
      console.log(err);
    } else {
      res.render("locations/index.ejs", { locations: allLocations });
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
  res.render("locations/new.ejs");
});

//SHOW - shows more info about a location
app.get("/locations/:id", function(req, res) {
  //find the campground with provided ID
  Location.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundLocation) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundLocation);
        //render show template with that campground
        res.render("locations/show", { location: foundLocation });
      }
    });
});

/////////////////COMMENST
app.get("/locations/:id/comments/new", function(req, res) {
  // find location by id
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { location: location });
    }
  });
});

app.post("/locations/:id/comments", function(req, res) {
  //lookup campground using ID
  Locations.findById(req.params.id, function(err, location) {
    if (err) {
      console.log(err);
      res.redirect("/locations");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          location.comments.push(comment);
          location.save();
          res.redirect("/locations/" + locations._id);
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log("The Nap App Server is Now Sleep Walking!");
});
