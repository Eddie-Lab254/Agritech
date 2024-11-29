// // userModel.js
// const db = require('../config/db');

// // User Registration Model
// const createUser = (userData, callback) => {
//     const { name, pin, county } = userData;
//     const query = `INSERT INTO users (name, pin, county) VALUES (?, ?, ?)`;
//     db.query(query, [name, pin, county], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results);
//     });
// };

// // User Retrieval Model (by ID)
// const getUserById = (userId, callback) => {
//     const query = `SELECT * FROM users WHERE id = ?`;
//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results[0]); // Return the first matching user
//     });
// };

// // Update User Profile Model
// const updateUserProfile = (userId, userData, callback) => {
//     const { name, county, pin } = userData;
//     const query = `UPDATE users SET name = ?, county = ?, pin = ? WHERE id = ?`;
//     db.query(query, [name, county, pin, userId], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results);
//     });
// };
// // Get User by PIN (Login)
// // const getUserByPin = (pin, callback) => {
// //     const query = 'SELECT * FROM users WHERE pin = ?';
// //     db.query(query, [pin], (err, results) => {
// //         callback(err, results[0]); // Return the first user matching the PIN
// //     });
// // };


// module.exports = {
//     createUser,
//     getUserById,
//     updateUserProfile,
// };
// const db = require('./config/db');

// // Create a new user
// const createUser = (user, callback) => {
//     const { name, pin, county } = user;
//     const query = 'INSERT INTO users (name, pin, county) VALUES (?, ?, ?)';
//     db.query(query, [name, pin, county], callback);
// };

// // Authenticate user by name and pin
// const authenticateUser = (name, pin, callback) => {
//     const query = 'SELECT * FROM users WHERE name = ? AND pin = ?';
//     db.query(query, [name, pin], (err, results) => {
//         if (err) return callback(err);
//         if (results.length === 0) return callback(null, null); // No user found
//         return callback(null, results[0]); // User found
//     });
// };

// // Get user profile by ID
// const getUserProfile = (userId, callback) => {
//     const query = 'SELECT * FROM users WHERE id = ?';
//     db.query(query, [userId], callback);
// };

// // Edit user profile
// const editUserProfile = (userId, updatedUser, callback) => {
//     const { name, pin, county } = updatedUser;
//     const query = 'UPDATE users SET name = ?, pin = ?, county = ? WHERE id = ?';
//     db.query(query, [name, pin, county, userId], callback);
// };

// module.exports = {
//     createUser,
//     authenticateUser,
//     getUserProfile,
//     editUserProfile
// };

// const db = require('../config/db');

// // User Registration Model
// const createUser = (userData, callback) => {
//     const { name, pin, county } = userData;
//     const query = `INSERT INTO users (name, pin, county) VALUES (?, ?, ?)`;
//     db.query(query, [name, pin, county], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results);
//     });
// };

// // User Retrieval Model (by Name)
// const getUserByName = (name, callback) => {
//     const query = `SELECT * FROM users WHERE name = ?`;
//     db.query(query, [name], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results[0]); // We expect a single user object
//     });
// };

// module.exports = {
//     createUser,
//     getUserByName
// };

// const db = require('../config/db');

// // User Registration Model
// const createUser = (userData, callback) => {
//     const { name, pin, county } = userData;
//     const query = `INSERT INTO users (name, pin, county) VALUES (?, ?, ?)`;
//     db.query(query, [name, pin, county], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results);
//     });
// };

// // User Login Model
// const getUserByPin = (pin, callback) => {
//     const query = `SELECT * FROM users WHERE pin = ?`;
//     db.query(query, [pin], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results[0]); // We expect a single user
//     });
// };

// module.exports = {
//     createUser,
//     getUserByPin
// };
const db = require('../config/db');

// Create a new user
exports.createUser = (name, pin, county, role) => {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, pin, county, role) VALUES (?, ?, ?, ?)';
        db.query(query, [name, pin, county, role], (error, results) => {
            if (error) {
              console.error('Database error during user creation:', error);
                return reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Find user by name and role
exports.findUserByNameAndRole = (name, role) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE name = ? AND role = ?';
        db.query(query, [name, role], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Return the first result (unique user)
            }
        });
    });
};
