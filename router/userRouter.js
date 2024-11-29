const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// POST route for user registration
router.post('/register', userController.register);

//route for the login
router.post('/login', userController.login);

module.exports = router;
