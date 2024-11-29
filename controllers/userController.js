
const db = require('../config/db');
const userModel= require("../models/userModel");
const bcrypt= require('bcryptjs');
const jsonwebtoken= require('jsonwebtoken');


exports.registerUser = async (req,res)=>{
   try{
    const userData = req.body;
    const result = await userModel.createUser(userData);
    
    //redirect the URL based on user type
    const redirectUrl = userData.userType === 'provider'? '/provider-dashboard.html' : '/seeker-dashboard.html';

    res.status(201).json({success: true,message: 'Registration successful',redirect: redirectUrl});
   } catch (error){
    res.status(500).json({error:'registration Failed'});
   }

};
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