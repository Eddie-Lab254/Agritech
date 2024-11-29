// const providerModel = require('../models/providerModel');
// const path = require ('path');

// //add a resource
// exports.addResource =(req,res)=> {
//     const { resourceType, description, location, price, availability} = req.body;
//     const imagePath = req.file? `/upload/${req.file.filename}`: null;

//     const newResource = {resourceType, description, location, price, availability, imagePath};
//     providerModel.addResource(newResource,(err, result) => {
//         if(err){
//             console.error('Error adding resource:', err);
//             return res.status (500).json({success:false,message: 'Error adding resource'});
//         }
//         res.json({success:true, message: 'Resources added successfully'});
//     });

//     //Get all resources
//     exports.getResources = (req, res) => {
//         providerModel.getResources((err, results) => {
//             if (err) {
//                 console.error('Error fetching resources:', err);
//                 return res.status(500).json({ success: false, message: 'Error fetching resources' });
//             }
//             res.json(results);
//         });
//     };

//     //delete a resource
//     exports.deleteResource =(req, res) =>{
//         const{id} = req.params;
//         providerModel.deleteResource(id,(err) => {
//             if(err){
//              console.error('Error deleting resource:',err);
//              return res.status(500).json({success:false,message: " Error deleting resource"});   
//             }
//             res.json({success: true ,messgae:"Resource deleted successfully"})
//         })
//     };
// };

// module.exports = {
//     addResource,
//     getResources,
//     deleteResource
// };
// Import the database connection
const db = require('../config/db');

// Define the addResource function
const addResource = (req, res) => {
    const { name, description, price, availability } = req.body;
    const image = req.file ? req.file.filename : null; // Use the uploaded image

    const query = 'INSERT INTO resources (name, description, price, availability, image) VALUES (?, ?, ?, ?, ?)';
    
    db.promise().query(query, [name, description, price, availability, image])
        .then(() => {
            res.status(201).json({ message: 'Resource added successfully!' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to add resource' });
        });
};

// Define the getResources function
const getResources = async (req, res) => {
    try {
        const [resources] = await db.promise().query('SELECT * FROM resources');
        res.status(200).json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve resources' });
    }
};

// Define the deleteResource function
const deleteResource = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM resources WHERE id = ?';

    db.promise().query(query, [id])
        .then(() => {
            res.status(200).json({ message: `Resource with ID ${id} deleted successfully` });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete resource' });
        });
};

// Export the functions
module.exports = {
    addResource,
    getResources,
    deleteResource
};
