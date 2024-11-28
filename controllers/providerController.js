const providerModel = require('../models/providerModel');
const path = require ('path');

//add a resource
exports.addResource =(req,res)=> {
    const { resourceType, description, location, price, availability} = req.body;
    const imagePath = req.file? `/upload/${req.file.filename}`: null;

    const newResource = {resourceType, description, location, price, availability, imagePath};
    providerModel.addResource(newResource,(err,result)=>{
        if(err){
            console.error('Error adding resource:', err);
            return res.status (500).json({success:false,message: 'Error adding resource'});
        }
        res.json({success:true, message: 'Resources added successfully'});
    });

    //Get all resources
    exports.getResources=(req,res)=>{
        
    }
};