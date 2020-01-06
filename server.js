var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var locations = [
  {
    name: "The Library",
    image:
      "https://cdn.pixabay.com/photo/2015/09/04/23/04/library-922998__340.jpg"
  }
];

app.get("/", function(req, res) {
  res.render("welcome");
});

app.get("/locations", function(req, res) {
  res.render("locations", { locations: locations });
});

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
