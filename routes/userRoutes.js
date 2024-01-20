const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  addUserInterest,
  registerUserForEvent,
  userRegisteredEvents,
  deleteUser ,
  getUserInterests,
  removeUserInterest,
  unregisterUserForEvent
} = require("../controllers/userControllers");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/addInterest/:userId").put(addUserInterest);
router.route("/removeInterest/:userId").put(removeUserInterest);
router.route("/userInterest/:userId").get(getUserInterests);
router.route("/registerEvent/:userId").post(registerUserForEvent);
router.route("/deleteUser/:userId").delete(deleteUser);
router.route("/userRegisteredEvents/:userId").get(userRegisteredEvents);
router.route("/cancelUserRegistration/:userId").delete(unregisterUserForEvent);
router.route("/userInterest/:userId").get(getUserInterests);


module.exports = router;
