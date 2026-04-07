const API_BASE_URL = '/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const api = {
    async fetchStudents() {
        const response = await fetch(`${API_BASE_URL}/students`);
        return await handleResponse(response);
    },

    async addStudent(name, student_id) {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, student_id })
        });
        return await handleResponse(response);
    },

    async fetchAttendance(date) {
        const response = await fetch(`${API_BASE_URL}/attendance/${date}`);
        return await handleResponse(response);
    },

    async markAttendance(student_id, date, status) {
        const response = await fetch(`${API_BASE_URL}/attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id, attendance_date: date, status })
        });
        return await handleResponse(response);
    },

    async deleteStudent(id) {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
            method: 'DELETE'
        });
        return await handleResponse(response);
    },

    async updateStudent(id, name, student_id) {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, student_id })
        });
        return await handleResponse(response);
    }
};
