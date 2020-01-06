var express = require("express");
var router = express.Router({ mergeParams: true });
// var middleware = require("../middleware");

var commentsCtrl = require("../controllers/comments");

router.get("/new", isLoggedIn, commentsCtrl.new);
router.post("/", isLoggedIn, commentsCtrl.create);

module.exports = router;
