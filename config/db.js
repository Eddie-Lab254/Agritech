const mysql = require('mysql2');

require('dotenv').config();

// dotenv.config();

const db =mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'edwinnjenga',
    database: 'AgriTech'
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;