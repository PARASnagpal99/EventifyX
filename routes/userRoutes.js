const express = require('express');
const router = express.Router();
const {signup,login,addUserInterest} = require('../controllers/userControllers')


router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/addInterest/:userId').put(addUserInterest);

module.exports = router ;