const express = require("express");
const router = express.Router();
const {getObject,putObject} = require("../controllers/awsS3Controllers");
const {protect} = require("../middlewares/authMiddleware");
const {isAdmin} = require("../middlewares/adminMiddleware");


router.route("/getImageS3Url").get(getObject);
router.route("/generateUploadS3Url").get(putObject);

module.exports = router ;
