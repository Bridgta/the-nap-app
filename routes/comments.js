var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require("../middleware");
const request = require("request");

var commentsCtrl = require("../controllers/comments");

router.get("/new", middleware.isLoggedIn, commentsCtrl.new);
router.post("/", middleware.isLoggedIn, commentsCtrl.create);
router.get(
  "/:comment_id/edit",
  middleware.checkCommentOwnership,
  commentsCtrl.edit
);

router.put(
  "/:comment_id",
  middleware.checkCommentOwnership,
  commentsCtrl.update
);

router.delete(
  "/:comment_id",
  middleware.checkCommentOwnership,
  commentsCtrl.delete
);

module.exports = router;
