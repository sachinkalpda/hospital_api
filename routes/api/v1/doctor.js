
const express = require('express');

const router = express.Router();
const doctorController = require('../../../controllers/api/v1/doctor_controller');

router.post('/register',doctorController.create);

router.post('/login',doctorController.login);


module.exports = router;