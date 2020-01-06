var Location = require("../models/location");
var Comment = require("../models/comment");
const middleware = require("../middleware");

function newComment(req, res) {
  // find location by id
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { location: location });
    }
  });
}

function create(req, res) {
  Location.findById(req.params.id, function(err, location) {
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
          res.redirect("/locations/" + location._id);
        }
      });
    }
  });
}

module.exports = {
  new: newComment,
  create
};
