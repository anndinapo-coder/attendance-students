const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/:date', attendanceController.getAttendanceByDate);
router.post('/', attendanceController.markAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
