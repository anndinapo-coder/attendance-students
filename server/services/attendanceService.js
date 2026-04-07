const pool = require('../config/db');

class AttendanceService {
    async getByDate(date) {
        const [rows] = await pool.query(`
            SELECT a.*, s.name, s.student_id AS student_code 
            FROM attendance a 
            JOIN students s ON a.student_id = s.id 
            WHERE a.attendance_date = ?`, [date]);
        return rows;
    }

    async mark(student_id, attendance_date, status) {
        if (status === 'Delete') {
            await pool.query('DELETE FROM attendance WHERE student_id = ? AND attendance_date = ?', [student_id, attendance_date]);
            return { message: 'Attendance record removed' };
        }

        const [existing] = await pool.query('SELECT * FROM attendance WHERE student_id = ? AND attendance_date = ?', [student_id, attendance_date]);
        if (existing.length > 0) {
            await pool.query('UPDATE attendance SET status = ? WHERE student_id = ? AND attendance_date = ?', [status, student_id, attendance_date]);
        } else {
            await pool.query('INSERT INTO attendance (student_id, attendance_date, status) VALUES (?, ?, ?)', [student_id, attendance_date, status]);
        }
        return { message: 'Attendance marked successfully' };
    }
}

module.exports = new AttendanceService();