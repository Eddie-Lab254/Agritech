const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, pin, county, role } = req.body;
    
    try {
        console.log('Received registration data:', {name,pin, county, role });
        // Encrypt the PIN
        const hashedPin = await bcrypt.hash(pin, 10);
        console.log('User created successfully');

        // Save the user to the database
        await userModel.createUser(name, hashedPin, county, role);

        res.status(201).json({
            message: 'Registration successful! Redirecting to login page...',
        });
    } catch (error) {
        console.log('Error during registration:', error);
        res.status(500).json({
            message: 'Error during registration',
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    const { name, pin, role } = req.body;

    try {
        // Find the user by name and role
        const user = await userModel.findUserByNameAndRole(name, role);

        if (!user) {
            return res.status(404).json({ message: 'User not found or role mismatch' });
        }

        // Compare the entered PIN with the hashed PIN in the database
        const isPinValid = await bcrypt.compare(pin, user.pin);
        if (!isPinValid) {
            return res.status(401).json({ message: 'Invalid PIN' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error during login',
            error: error.message,
        });
    }
};
