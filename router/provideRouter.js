const express = require ('express');
const router = require ('router');
const multer = require ('multer');
const providerController = require('../controllers/providerController');

//set up multer for image uploads
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'Frontend/uploads/');
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() + Path.extname(file.originalname));
    }
});

const upload = multer({stoarge});

//add a resource
router.post('/add', upload.single('image'), providerController.addResource);

//Get all resources
router.get('/', providerController.getResources);

//Delete a resource
router.delete('/:id', providerController.deleteResource);

module.exports = router;