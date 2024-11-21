const express = require('express');
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const jsonwebtoken= require("jsonwebtoken");

// Initialization
const app = express();
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sessionStore = new MySQLStore({}, db);
app.use(session({
    secret: 'yet738393ehhurienfeifjoehgjwf4t04fbfkjefgy7449ufjfjkf',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false }
            
}));

const PORT = 2024;

// Launch the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});