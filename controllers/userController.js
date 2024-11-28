
// const userModel = require('../models/userModel');
// const bcrypt = require('bcryptjs');  // Using bcryptjs for hashing pin
// const jwt = require('jsonwebtoken');

// // User Registration
// const registerUser = (req, res) => {
//     const { name, pin, county , role } = req.body;

//     if (!name || !pin || !county || !role) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     // Hash the pin before saving
//     bcrypt.hash(pin, 10, (err, hashedPin) => {
//         if (err) {
//             return res.status(500).json({ message: "Error hashing pin." });
//         }

//         const userData = { name, pin: hashedPin, county , role};
//         userModel.createUser(userData, (err, results) => {
//             if (err) {
//                 return res.status(500).json({ message: "Database error during registration." });
//             }
//             res.status(201).json({ message: "User registered successfully!" });
//         });
//     });
// };

// // User Login
// const loginUser = (req, res) => {
//     const { pin } = req.body;

//     if (!pin) {
//         return res.status(400).json({ message: "Pin is required." });
//     }

//     userModel.getUserByPin(pin, (err, user) => {
//         if (err || !user) {
//             return res.status(401).json({ message: "Invalid pin." });
//         }

//         // Compare entered pin with hashed pin in database
//         bcrypt.compare(pin, user.pin, (err, isMatch) => {
//             if (!isMatch) {
//                 return res.status(401).json({ message: "Invalid pin." });
//             }

//             // Create JWT token for session management
//             const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             res.status(200).json({ message: "Login successful", token });
//         });
//     });
// };

// module.exports = {
//     registerUser,
//     loginUser
// };
const db = require('../config/db');
const userModel= require("../models/userModel");
const bcrypt= require('bcryptjs');
const jsonwebtoken= require('jsonwebtoken');


exports.registerUser = async (req,res)=>{
   try{
    const userData = req.body;
    const result = await userModel.createUser(userData);
    res.status(201).json(result);
   }catch(error){
    res.status(500).json({error: 'Registration Failed'})
   }
};


// exports.login = ( req,res) => {
//     const { name, pin} = req.body;

//     const query = 'SELECT * FROM user WHERE name=?';
//     db.query ( query, [name], (err, result) => {
//         if (err || result.length === 0){
//             return res.status (400).json ({message :'invalid name or pin'});
//         }

//         const user = result [0];
//         bcrypt.compare(pin, user.pin, (err, isMatch) => {
//          if (err || !isMatch){
//             return res.status (400).json({message: 'invalid name or pin'})
//          } 

//          const token = jsonwebtoken.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
//          res.status(200).json({message: 'login successful', token});
//         });
//     });
// };

exports.login = async (req, res) => {
    try{
        const {name, pin} = req.body;

        const [result] = await db.promise().query('SELECT * FROM users WHERE name=?',[name]);

        if (result.length === 0){
            return res.status(400).json ({message: 'invalid name or pin'});
    
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(pin, user.pin);
        if(!isMatch){
            return res.status(400).json({messgae: 'invalid name or pin'});
        }
        // generate token for the user
        const token = jsonwebtoken.sign(
            {userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'}
        );
        res.status(200).json({message: 'login successful', token});
        }catch(error){
        res.status(500).json({message: 'An error occurred.Please try again later'});
    }
};