const express = require('express');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./config/db');

// Test DB connection
pool.getConnection()
    .then(conn => {
        console.log('Successfully connected to the database');
        conn.release();
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err.message);
    });

app.use(cors());
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Catch-all route to serve the frontend for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
