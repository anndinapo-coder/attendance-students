const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function init() {
    // Connect using new environment variable names
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD
    });

    try {
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const commands = schema.split(';').filter(cmd => cmd.trim());

        for (const cmd of commands) {
            await connection.query(cmd);
        }

        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err.message);
    } finally {
        await connection.end();
    }
}

init();