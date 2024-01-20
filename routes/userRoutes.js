const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  addUserInterest,
  registerUserForEvent,
  userRegisteredEvents,
  deleteUser ,
  getUserInterests
} = require("../controllers/userControllers");
const {protect} = require('../middlewares/authMiddleware');


router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/addInterest/:userId").put(protect,addUserInterest);
router.route("/userInterest/:userId").get(protect,getUserInterests);
router.route("/registerEvent/:userId").post(registerUserForEvent);
router.route("/deleteUser/:userId").delete(protect,deleteUser);
router.route("/userRegisteredEvents/:userId").get(protect,userRegisteredEvents);
router.route("/userInterest/:userId").get(protect,getUserInterests);


module.exports = router;
