import { api } from './api.js';
import { state } from './state.js';
import { ui } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const { elements } = ui;

    // Set default date
    elements.attendanceDateInput.value = state.currentDate;

    // Event Listeners
    elements.studentForm.addEventListener('submit', handleAddStudent);
    elements.studentSearchInput.addEventListener('input', handleSearch);
    elements.loadAttendanceBtn.addEventListener('click', () => loadAll());
    elements.attendanceDateInput.addEventListener('change', (e) => {
        state.setCurrentDate(e.target.value);
        loadAll();
    });

    // Initialize
    loadAll();

    async function loadAll() {
        try {
            const students = await api.fetchStudents();
            const attendance = await api.fetchAttendance(state.currentDate);
            
            state.setStudents(students);
            state.setAttendance(attendance);
            
            refreshUI();
        } catch (err) {
            ui.showNotification(`Error: ${err.message}`, 'error');
        }
    }

    function refreshUI() {
        ui.renderStats(state.getStats());
        ui.renderStudentsList(state.allStudents, handleDeleteStudent, handleEditStudent);
        ui.renderAttendance(state.allStudents, state.attendanceMap, handleMarkAttendance);
    }

    async function handleAddStudent(e) {
        e.preventDefault();
        const name = elements.studentNameInput.value.trim();
        const student_id = elements.studentIdInput.value.trim();
        
        if (!name || !student_id) return;

        try {
            await api.addStudent(name, student_id);
            elements.studentForm.reset();
            await loadAll();
            ui.showNotification('Student added successfully');
        } catch (err) {
            ui.showNotification(`Add Failed: ${err.message}`, 'error');
        }
    }

    function handleSearch() {
        const query = elements.studentSearchInput.value.toLowerCase();
        const filtered = state.allStudents.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.student_id.toLowerCase().includes(query)
        );
        ui.renderStudentsList(filtered, handleDeleteStudent, handleEditStudent);
    }

    async function handleEditStudent(student) {
        const newName = prompt('Enter new name:', student.name);
        if (newName === null) return;
        
        const newId = prompt('Enter new student ID:', student.student_id);
        if (newId === null) return;

        if (newName.trim() === '' || newId.trim() === '') {
            ui.showNotification('Name and ID cannot be empty', 'error');
            return;
        }

        try {
            await api.updateStudent(student.id, newName.trim(), newId.trim());
            await loadAll();
            ui.showNotification('Student updated');
        } catch (err) {
            ui.showNotification(`Update failed: ${err.message}`, 'error');
        }
    }

    async function handleDeleteStudent(student) {
        if (confirm(`Delete ${student.name}?`)) {
            try {
                await api.deleteStudent(student.id);
                await loadAll();
                ui.showNotification('Student removed');
            } catch (err) {
                ui.showNotification('Delete failed', 'error');
            }
        }
    }

    async function handleMarkAttendance(student, status) {
        try {
            await api.markAttendance(student.id, state.currentDate, status);
            const attendance = await api.fetchAttendance(state.currentDate);
            state.setAttendance(attendance);
            refreshUI();
            ui.showNotification(status === 'Delete' ? 'Status reset' : `${student.name} marked ${status}`);
        } catch (err) {
            ui.showNotification('Update failed', 'error');
        }
    }
});