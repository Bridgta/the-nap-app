var Location = require("../models/location");
var middleware = require("../middleware");

//INDEX - show all locations
function index(req, res) {
  Location.find({}, function(err, allLocations) {
    if (err) {
      console.log(err);
    } else {
      res.render("locations/index.ejs", { locations: allLocations });
    }
  });
}

function create(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var creator = {
    id: req.user._id,
    username: req.user.username
  };
  var newLocation = {
    name: name,
    image: image,
    description: desc,
    creator: creator
  };
  Location.create(newLocation, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/locations");
    }
  });
}

//NEW
function newLocation(req, res) {
  res.render("locations/new.ejs");
}

//SHOW
function show(req, res) {
  Location.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundLocation) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundLocation);
        res.render("locations/show.ejs", { location: foundLocation });
      }
    });
}

function edit(req, res) {
  Location.findById(req.params.id, function(err, foundLocation) {
    res.render("locations/edit", { location: foundLocation });
  });
}

function update(req, res) {
  Location.findByIdAndUpdate(req.params.id, req.body.location, function(
    err,
    updatedLocation
  ) {
    if (err) {
      res.redirect("/locations");
    } else {
      res.redirect("/locations/" + req.params.id);
    }
  });
}

function deleteLocation(req, res) {
  Location.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/locations");
    } else {
      res.redirect("/locations");
    }
  });
}

module.exports = {
  index,
  create,
  new: newLocation,
  show,
  edit,
  update,
  delete: deleteLocation
};
