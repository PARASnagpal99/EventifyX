const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventByCity,
  getEventByInterest,
  getEventByCityAndInterest,
  searchEventByEventName,
} = require("../controllers/eventControllers");

router.route("/").get(getAllEvents);
router.route("/city/:cityName/").get(getEventByCity);
router.route("/interest/:interestName/").get(getEventByInterest);
router
  .route("/search/city/:cityName/interest/:interestName/")
  .get(getEventByCityAndInterest);
router
  .route("/search/eventByName")
  .get(searchEventByEventName);

module.exports = router ;

