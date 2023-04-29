const express = require('express');


const router = express.Router();

const homeController = require('../../../controllers/api/v1/home_controller');

const passport = require('passport');

router.get('/home',passport.authenticate('jwt',{session: false}),homeController.home);


router.use('/doctor',require('./doctor'));




module.exports = router;