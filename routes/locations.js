const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");
const middleware = require("../middleware");

router.get("/", locationsCtrl.index);
router.post("/", middleware.isLoggedIn, locationsCtrl.create);
router.get("/new", middleware.isLoggedIn, locationsCtrl.new);
router.get("/:id", locationsCtrl.show);

module.exports = router;
