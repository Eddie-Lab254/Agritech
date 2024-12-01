// const db = require ('../config/db');

// //Get all resources
// exports.getResources = async ( req,res) =>{
//     try{
//         const [ resources] = await db.promise().query('SELECT * FROM resources WHERE availability = 1');
//         res.status(200).json(resources);
//     } catch(error){
//         console.error('Error fething resources:', error);
//         res.status(500).json({error: 'Failed to fetch rsources'});
//     }
// };

const path = require ('path');
const fs = require ('fs');
const resourceModel=require('../models/resourceModel');

//add a resource
exports.addResource = async (req,res) => {
    try{
        const provider_id = req.session.userId;
        if(!providerId) return res.status (401).json({ success: false, message: 'Provider not logged in' });

        if(!req.file || !req.fies.image ){
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const image = req.files.image;
        const uploadDir = path.join(__dirname, '../uploads/resources');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const imagePath = `${uploadDir}/${providerId}_${image.name}`;
        await image.mv(imagePath);

        const relativePath = `uploads/resources/${providerId}_${image.name}`;

        const resourceData = {
            provider_id: providerId,
            resource_type: req.body.resourceType,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price,
            availability: req.body.availability === 'true',
            phone: req.body.phone,
            image_path: relativePath,
        };

        await resourceModel.addResource(resourceData);
        res.json({ success: true, message: 'Resource uploaded successfully!' });
    } catch {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

// Get resources by provider
exports.getAllResources = async (req, res) => {
    try {
        const providerId = req.session.userId;
        if (!providerId) return res.status(401).json({ success: false, message: 'Provider not logged in' });

        const resources = await resourceModel.getResourcesByProvider(providerId);
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    try {
        const resourceId = req.params.id;
        await resourceModel.deleteResource(resourceId);
        res.json({ success: true, message: 'Resource deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};