var express = require("express");
var router = express.Router();
var locationsCtrl = require("../controllers/locations");

router.get("/", locationsCtrl.index);
router.post("/", isLoggedIn, locationsCtrl.create);
router.get("/new", isLoggedIn, locationsCtrl.new);
router.get("/:id", locationsCtrl.show);

module.exports = router;
