const express = require('express');

const router = express.Router();

const reportController = require('../../../controllers/api/v1/report_controller');


// route for showing the reports by filter their status
router.get('/:status',reportController.filterReports);


module.exports = router;