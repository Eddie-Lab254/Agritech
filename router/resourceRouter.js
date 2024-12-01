const express = require ( 'express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

//get resource by provider
router.get('/', resourceController.getAllResources);

// Add a new resource
router.post('/add', resourceController.addResource);


// Delete a resource
router.delete('/delete/:id', resourceController.deleteResource);


module.exports = router;