const express = require('express');
const router = express.Router();
const {getAllEvents,getEventByCity,getEventByInterest} = require('../controllers/eventControllers');


router.route('/').get(getAllEvents);
router.route("/city/:cityName/").get(getEventByCity);
router.route("/interest/:interestName/").get(getEventByInterest);


module.exports = router ;