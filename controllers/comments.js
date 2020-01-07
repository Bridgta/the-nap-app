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

function edit(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        location_id: req.params.id,
        comment: foundComment
      });
    }
  });
}

function update(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/locations/" + req.params.id);
    }
  });
}

function deleteComment(req, res) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/locations/" + req.params.id);
    }
  });
}

module.exports = {
  new: newComment,
  create,
  edit,
  update,
  delete: deleteComment
};
