const providerModel = require('../models/providerModel');
const path = require ('path');

//add a resource
exports.addResource =(req,res)=> {
    const { resourceType, description, location, price, availability} = req.body;
    const imagePath = req.file? `/upload/${req.file.filename}`: null;

    const newResource = {resourceType, description, location, price, availability, imagePath};
    providerModel.addResource(newResource,(err, result) => {
        if(err){
            console.error('Error adding resource:', err);
            return res.status (500).json({success:false,message: 'Error adding resource'});
        }
        res.json({success:true, message: 'Resources added successfully'});
    });

    //Get all resources
    exports.getResources = (req, res) => {
        providerModel.getResources((err, results) => {
            if (err) {
                console.error('Error fetching resources:', err);
                return res.status(500).json({ success: false, message: 'Error fetching resources' });
            }
            res.json(results);
        });
    };

    //delete a resource
    exports.deleteResource =(req, res) =>{
        const{id} = req.params;
        providerModel.deleteResource(id,(err) => {
            if(err){
             console.error('Error deleting resource:',err);
             return res.status(500).json({success:false,message: " Error deleting resource"});   
            }
            res.json({success: true ,messgae:"Resource deleted successfully"})
        })
    };
};