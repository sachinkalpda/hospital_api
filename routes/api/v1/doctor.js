
const express = require('express');

const router = express.Router();
const doctorController = require('../../../controllers/api/v1/doctor_controller');

// route for register a new doctor
router.post('/register',doctorController.create);

// route for login the doctor
router.post('/login',doctorController.login);


module.exports = router;