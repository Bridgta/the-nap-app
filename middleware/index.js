const Location = require("../models/location");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkLocationAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    Location.findById(req.params.id, function(err, foundLocation) {
      if (err) {
        res.redirect("back");
      } else {
        // does user own the location?
        if (foundLocation.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
