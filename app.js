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
const multer = require ('multer');

const userRouter = require('./router/userRouter');
const providerRouter = require ('./router/providerRouter'); 
const resourceRouter = require('./router/resourceRouter');
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
app.use('/api/resources', providerRouter);
app.use ('/api/resources', resourceRouter);

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

app.post('/api/user/login', async (req, res) => {
    const {phone,pin} = req.body;

    if(!phone || !pin){
        return res.status(400).json({message:'Phone,Pin are required'});

    }
    try{
        const user = await user.findOne({phone});
        if (!user){
            return res.status(400).json({message:'User not found'})
        }
        const isValidPin = bcrypt.compareSync(pin, user.pin);
        if (!isValidPin){
            return res.status(400).json({message:'Invalid PIN'});

        }
         // Compare role from the request with the role from the user
         if (user.role !== role){
             return res.status(400).json({message:'Role mismatch'});
         }

         // check pass
         const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'1h'});
         return res.json({message: 'Login successful',token,role:user.role});

    } catch (error){
        console.error('Error logging in:',error);
        return res.status(500).json({message:"Sever error"});
    }
});

app.post('/api/user/logout', (req,res) => {
    req.session?.destroy((err)=>{
        if(err){
            console.error ('Error destroying session:', err);
            return res.status(500).json({success: false,message:'Logout failed'});
        }

        res.clearCookie('connect.sid');
        res.status(200).json({success: true,message: 'Logout successful'});
    });
});


// Server launch
const PORT = 2024;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
});
