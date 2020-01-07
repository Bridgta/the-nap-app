var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require("../middleware");
var commentsCtrl = require("../controllers/comments");

router.get("/new", middleware.isLoggedIn, commentsCtrl.new);
router.post("/", middleware.isLoggedIn, commentsCtrl.create);
router.get("/:comment_id/edit", middleware.checkCommentAuth, commentsCtrl.edit);
router.put("/:comment_id", middleware.checkCommentAuth, commentsCtrl.update);
router.delete("/:comment_id", middleware.checkCommentAuth, commentsCtrl.delete);

module.exports = router;
