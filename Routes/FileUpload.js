const express = require('express');
const router = express.Router();

// import controllers
const localfileupload = require('../Controllers/fileupload');
const imageupload = require('../Controllers/fileupload')
const videoupload = require('../Controllers/fileupload');
const imagesizereducer = require('../Controllers/fileupload')

// api routes
router.post('/imageupload', imageupload);
router.post('/videoupload', videoupload);
router.post('/imagesizereducer', imagesizereducer);
router.post('/localfileupload', localfileupload);

module.exports = router;