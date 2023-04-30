const express = require('express');

const router = express.Router();

const patientController = require('../../../controllers/api/v1/patient_controller');

const passport = require('passport');

// route for register the new patient
router.post('/register',passport.authenticate('jwt',{session : false}),patientController.register);

// route for creating a report for a patient
router.post('/:id/create_report',passport.authenticate('jwt',{session: false}),patientController.createReport);

// route to get all registered patient information
router.get('/all',passport.authenticate('jwt',{session : false}),patientController.allPatients);

// route to view all reports of a particular patient
router.get('/:id/all_reports',passport.authenticate('jwt',{session: false}),patientController.allReports);




module.exports = router;