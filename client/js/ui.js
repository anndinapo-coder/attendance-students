export const ui = {
    elements: {
        studentForm: document.getElementById('student-form'),
        studentNameInput: document.getElementById('student-name'),
        studentIdInput: document.getElementById('student-id'),
        studentSearchInput: document.getElementById('student-search'),
        attendanceDateInput: document.getElementById('attendance-date'),
        loadAttendanceBtn: document.getElementById('load-attendance'),
        attendanceBody: document.getElementById('attendance-body'),
        studentsListBody: document.getElementById('students-list-body'),
        notificationContainer: document.getElementById('notification-container'),
        statTotal: document.getElementById('stat-total'),
        statPresent: document.getElementById('stat-present'),
        statAbsent: document.getElementById('stat-absent'),
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        this.elements.notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    },

    renderStats(stats) {
        this.elements.statTotal.textContent = stats.total;
        this.elements.statPresent.textContent = stats.present;
        this.elements.statAbsent.textContent = stats.absent;
    },

    renderStudentsList(students, onDelete, onEdit) {
        this.elements.studentsListBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${student.student_id}</strong></td>
                <td>${student.name}</td>
                <td>
                    <div class="action-group">
                        <button class="btn btn-edit edit-student-btn" title="Edit Student">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-delete delete-student-btn" title="Delete Student">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            row.querySelector('.edit-student-btn').addEventListener('click', () => {
                onEdit(student);
            });

            row.querySelector('.delete-student-btn').addEventListener('click', () => {
                onDelete(student);
            });
            this.elements.studentsListBody.appendChild(row);
        });
    },

    renderAttendance(students, attendanceMap, onMark) {
        this.elements.attendanceBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            const currentStatus = attendanceMap.get(student.id) || '';

            row.innerHTML = `
                <td><strong>${student.student_id}</strong></td>
                <td>${student.name}</td>
                <td>
                    <div class="status-btn-group">
                        <button class="status-btn ${currentStatus === 'Present' ? 'active-present' : ''}" data-status="Present">Present</button>
                        <button class="status-btn ${currentStatus === 'Absent' ? 'active-absent' : ''}" data-status="Absent">Absent</button>
                        <button class="status-btn ${currentStatus === 'Delete' ? 'active-delete' : ''}" data-status="Delete">Reset</button>
                    </div>
                </td>
            `;

            row.querySelectorAll('.status-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const status = btn.getAttribute('data-status');
                    onMark(student, status);
                });
            });
            this.elements.attendanceBody.appendChild(row);
        });
    }
};