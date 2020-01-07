var express = require("express");
var router = express.Router();
var locationsCtrl = require("../controllers/locations");
var middleware = require("../middleware");

router.get("/", locationsCtrl.index);
router.post("/", middleware.isLoggedIn, locationsCtrl.create);
router.get("/new", middleware.isLoggedIn, locationsCtrl.new);
router.get("/:id", locationsCtrl.show);
router.get("/:id/edit", middleware.checkLocationOwnership, locationsCtrl.edit);
router.put("/:id", middleware.checkLocationOwnership, locationsCtrl.update);

router.delete("/:id", middleware.checkLocationOwnership, locationsCtrl.delete);

module.exports = router;
