// app.js
const express = require('express');
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const bcrypt= require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const userRouter = require('./router/userRouter');  // Import userRouter

// Initialization
const app = express();
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sessionStore = new MySQLStore({}, db);
app.use(session({
    secret: 'yet738393ehhurienfeifjoehgjwf4t04fbfkjefgy7449ufjfjkf',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Use the userRouter for API routes under /api
app.use('/api/user', userRouter);

// Serve the main page and static HTML routes
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'login.html'));
});

// Server launch
const PORT = 2024;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

