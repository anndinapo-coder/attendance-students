export const state = {
    allStudents: [],
    attendanceMap: new Map(),
    currentDate: (() => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    })(),

    setStudents(students) {
        this.allStudents = students;
    },

    setAttendance(attendance) {
        this.attendanceMap = new Map();
        attendance.forEach(record => {
            this.attendanceMap.set(record.student_id, record.status);
        });
    },

    setCurrentDate(date) {
        this.currentDate = date;
    },

    getStats() {
        let presentCount = 0;
        let absentCount = 0;
        this.attendanceMap.forEach(status => {
            if (status === 'Present') presentCount++;
            if (status === 'Absent') absentCount++;
        });

        return {
            total: this.allStudents.length,
            present: presentCount,
            absent: absentCount
        };
    }
};