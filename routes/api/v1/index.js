const express = require('express');


const router = express.Router();

// passport library for passport authintication
const passport = require('passport');




router.use('/doctor',require('./doctor'));
router.use('/patient',require('./patient'));
router.use('/reports',require('./report'));




module.exports = router;