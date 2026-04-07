const pool = require('../config/db');

class StudentService {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM students');
        return rows;
    }

    async add(name, student_id) {
        // Check for duplicate
        const [existing] = await pool.query('SELECT id FROM students WHERE student_id = ?', [student_id]);
        if (existing.length > 0) throw new Error('Student ID already exists');

        const [result] = await pool.query('INSERT INTO students (name, student_id) VALUES (?, ?)', [name, student_id]);
        return { id: result.insertId, name, student_id };
    }

    async delete(id) {
        await pool.query('DELETE FROM students WHERE id = ?', [id]);
    }

    async update(id, name, student_id) {
        // Check if new student_id is taken by someone else
        const [existing] = await pool.query('SELECT id FROM students WHERE student_id = ? AND id != ?', [student_id, id]);
        if (existing.length > 0) throw new Error('Student ID already exists');

        await pool.query('UPDATE students SET name = ?, student_id = ? WHERE id = ?', [name, student_id, id]);
        return { id, name, student_id };
    }
}

module.exports = new StudentService();