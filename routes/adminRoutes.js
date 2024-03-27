const express = require("express");
const router = express.Router();
const {adminLogin , adminSignup , createEvent} = require("../controllers/adminControllers");
const {protect} = require("../middlewares/authMiddleware");
const {isAdmin} = require("../middlewares/adminMiddleware");

router.route("/login").post(adminLogin);
router.route("/signup").post(adminSignup);
router.route("/createEvent").post(isAdmin,protect,createEvent);

module.exports = router ;
