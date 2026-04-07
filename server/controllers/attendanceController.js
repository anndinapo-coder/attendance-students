const attendanceService = require('../services/attendanceService');
const pool = require('../config/db');

exports.getAttendanceByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const rows = await attendanceService.getByDate(date);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAttendance = async (req, res) => {
    const { student_id, attendance_date, status } = req.body;
    try {
        const result = await attendanceService.mark(student_id, attendance_date, status);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAttendance = async (req, res) => {
    // Note: Standard delete is still available by ID, 
    // but the 'mark' method handles status-based deletion too.
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM attendance WHERE id = ?', [id]);
        res.json({ message: 'Attendance deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};