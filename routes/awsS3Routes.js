const express = require("express");
const router = express.Router();
const {uploadImage} = require("../controllers/awsS3Controllers");
const {protect} = require("../middlewares/authMiddleware");
const {isAdmin} = require("../middlewares/adminMiddleware");


router.route("/uploadImage").put(uploadImage);
module.exports = router ;
