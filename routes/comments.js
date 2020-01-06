var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require("../middleware");
var commentsCtrl = require("../controllers/comments");

router.get("/new", middleware.isLoggedIn, commentsCtrl.new);
router.post("/", middleware.isLoggedIn, commentsCtrl.create);

module.exports = router;
