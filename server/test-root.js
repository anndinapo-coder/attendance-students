const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'mysql'
        });
        console.log('SUCCESS: Connected as root with mysql');
        await connection.end();
    } catch (err) {
        console.log('FAILED: ' + err.message);
    }
}

test();