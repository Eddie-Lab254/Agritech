// const path = require('path');
// const fs =require ('fs');
// const db = require('../config/db');

// //upload profile picture
// exports.uploadProfilePicture = async (req,res) => {
//     try{
//         const userId = req.session.userId;
//         if(!userId) return res.status(401).json({success: false, message: 'User not logged in'});

//         const profileImage = req.files.profileImage;
//         if(!profileImage) return res.status(400).json({success: false, message: 'No image uploaded' });

//         const uploadDir = path.join(__dirname, '../uploads/profile_pictures');
//         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//         const imagePath = `${uploadDir}/${userId}_${profileImage.name}`;
//         await profileImage.mv(imagePath);

//         const relativePath =`uploads/profile_picture/${userId}_${profileImage.name}`;
//         const query = 'UPDATE users SET profile_picture =? WHERE id= ?';
//         await db.query(query,[relativePath, userId]);

//         res.join({success: true, message:'Profile picture uploaded successfully', path: relativePath});
//     } catch {
//        console.error(error);
//        res.status(500).json({success: false, message:'Server error'});
//     }
// };

// //fetch profile picture
// exports.getProfilePicture = async (req,res) =>{
//     try{
//        const userId = req.session.userId;
//        const query = 'SELECT profile_picture FROM users WHERE id=?';
//        const [ result ] = await db.query(query,[userId]);

//        if(result && result.profile_picture){
//         res.json({success:true, path: result.profile_picture});
       
//         } else {
//         res.json({ success: false, message: 'No profile picture found' });
 
//         }
//     } catch (error) {
//        console.error(error);
//        res.status(500).json({ success: false, message: 'Server error'})
//     }
// };


// const path = require('path');
// const fs = require('fs');
// const db = require('../config/db'); // Adjust path to your DB configuration

// // Upload Profile Picture
// exports.uploadProfilePicture = async (req, res) => {
//     try {
//         const userId = req.session.userId; // Ensure this is set during login
//         if (!userId) return res.status(401).json({ success: false, message: 'User not logged in' });

//         if (!req.files || !req.files.profileImage) {
//             return res.status(400).json({ success: false, message: 'No image uploaded' });
//         }

//         const profileImage = req.files.profileImage;

//         const uploadDir = path.join(__dirname, '../uploads/profile_pictures');
//         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//         const imagePath = `${uploadDir}/${userId}_${profileImage.name}`;
//         await profileImage.mv(imagePath); // Save file to server

//         const relativePath = `uploads/profile_pictures/${userId}_${profileImage.name}`; // Relative path for frontend

//         // Update the database with the new profile picture path
//         const query = 'UPDATE users SET profile_picture = ? WHERE id = ?';
//         await db.query(query, [relativePath, userId]);

//         res.json({ success: true, message: 'Profile picture uploaded successfully', path: relativePath });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// // Get Profile Picture
// exports.getProfilePicture = async (req, res) => {
//     try {
//         const userId = req.session.userId;
//         if (!userId) return res.status(401).json({ success: false, message: 'User not logged in' });

//         const query = 'SELECT profile_picture FROM users WHERE id = ?';
//         const [rows] = await db.query(query, [userId]);

//         if (rows && rows[0] && rows[0].profile_picture) {
//             res.json({ success: true, path: rows[0].profile_picture });
//         } else {
//             res.json({ success: false, message: 'No profile picture found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

const path = require('path');
const fs = require('fs');
const db = require('../config/db'); // Adjust path to your DB configuration

// Upload Profile Picture
exports.uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.session.userId; // Ensure this is set during login
        if (!userId) return res.status(401).json({ success: false, message: 'User not logged in' });

        if (!req.files || !req.files.profileImage) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const profileImage = req.files.profileImage;

        // Ensure the upload directory exists
        const uploadDir = path.join(__dirname, '../uploads/profile_pictures');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        // Use unique file naming to prevent overwriting
        const fileExtension = path.extname(profileImage.name);
        const fileName = `${userId}_${Date.now()}${fileExtension}`;
        const imagePath = path.join(uploadDir, fileName);

        // Move the file to the upload directory
        await profileImage.mv(imagePath);

        // Relative path for frontend usage
        const relativePath = `uploads/profile_pictures/${fileName}`;

        // Update the database with the new profile picture path
        const query = 'UPDATE users SET profile_picture = ? WHERE id = ?';
        await db.query(query, [relativePath, userId]);

        res.json({ success: true, message: 'Profile picture uploaded successfully', path: relativePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get Profile Picture
exports.getProfilePicture = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'User not logged in' });

        const query = 'SELECT profile_picture FROM users WHERE id = ?';
        const [rows] = await db.query(query, [userId]);

        if (rows && rows[0] && rows[0].profile_picture) {
            res.json({ success: true, path: rows[0].profile_picture });
        } else {
            res.json({ success: false, message: 'No profile picture found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
