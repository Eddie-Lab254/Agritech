const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Import 'path' module
const providerController = require('../controllers/providerController');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Frontend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Add a resource
router.post('/add', upload.single('image'), providerController.addResource);

// Get all resources
router.get('/', providerController.getResources);

// Delete a resource
router.delete('/:id', providerController.deleteResource);

module.exports = router;
