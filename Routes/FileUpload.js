const express = require("express");

const router = express.Router();

const { localFileUpload, imageUpload, videoUpload } = require("../Controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;