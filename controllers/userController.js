const db = require('../config/db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration endpoint
exports.register = async (req, res) => {
    const { name, pin, county, role, phone } = req.body;

    try {
        // Check if the phone number is already in use
        const query = 'SELECT * FROM users WHERE phone = ?';
        db.query(query, [phone], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error." });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "Phone number already registered." });
            }

            // Hash the PIN
            const hashedPin = await bcrypt.hash(pin, 10);

            // Create a new user
            const insertQuery = 'INSERT INTO users (name, pin, county, role, phone) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [name, hashedPin, county, role, phone], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Server error." });
                }

                res.status(201).json({ message: "Registration successful." });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

// Login endpoint
exports.login = async (req, res) => {
    const { phone, pin} = req.body;

    try {
        // Find the user by phone number
        const query = 'SELECT * FROM users WHERE phone = ?';
        db.query(query, [phone], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error." });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: "User not found." });
            }

            const user = result[0]; // The user data from the query

            // Compare PIN
            const isMatch = await bcrypt.compare(pin, user.pin);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid PIN." });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id, role: user.role }, 'yet738393ehhurienfeifjoehgjwf4t04fbfkjefgy7449ufjfjkf', { expiresIn: '1h' });

       
                return res.status (200).json({
                message: 'Login successful.',
                token,
                role: user.role
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
