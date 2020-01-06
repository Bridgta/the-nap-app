const Location = require("../models/locations");
// var middleware = require("../middleware");

//INDEX - show all locations
function index(req, res) {
    Location.find({}, function(err, allLocations) {
      if (err) {
        console.log(err);
      } else {
        res.render("locations/index.ejs", { locations: allLocations });
      }
    });
  });

//Create - create all locations
function create(req, res) {
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
function new(req, res) {
    res.render("locations/new.ejs");
  });

//SHOW - shows more info about a location
function show(req, res) {
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




module.exports = {
  index,
  create,
  new: newLocation,
  show,
};