const express = require('express');
const router = express.Router();

// import controllers
const localfileupload = require('../Controllers/fileupload');

// api routes
// router.post('/imageupload', imageupload);
// router.post('/videoupload', videoupload);
// router.post('/imagereducerupload', imagereducerupload);
router.post('/localfileupload', localfileupload);

module.exports = router;