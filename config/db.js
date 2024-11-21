const mysql = require('mysql2/promise');

require('dotenv').config();

// dotenv.config();

const db =mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'edwinnjenga',
    database: 'AgriTech'
})


module.exports = db;