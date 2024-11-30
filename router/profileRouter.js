const express = require ('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

//upload profile picture
router.post('/upload',profileController.uploadProfilePicture);

//get the profile picture
router.get('/', profileController.getProfilePicture);

module.exports = router;