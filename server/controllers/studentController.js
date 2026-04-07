const studentService = require('../services/studentService');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addStudent = async (req, res) => {
    const { name, student_id } = req.body;
    try {
        const student = await studentService.add(name, student_id);
        res.json(student);
    } catch (err) {
        res.status(err.message === 'Student ID already exists' ? 400 : 500).json({ error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await studentService.delete(id);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, student_id } = req.body;
    try {
        const student = await studentService.update(id, name, student_id);
        res.json(student);
    } catch (err) {
        res.status(err.message === 'Student ID already exists' ? 400 : 500).json({ error: err.message });
    }
};