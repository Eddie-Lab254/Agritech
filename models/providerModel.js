const db = require('../config/db');

//Add a resource
exports.addResource = (resource, callback) =>{
    const query = `INSERT INTO resource (resource_type, description, location, price, availability, image_path)
    VALUES (?, ?, ?, ? ,?, ?)`;
    const values =[
        resource.resourceType,
        resource.description,
        resource.location,
        resource.price,
        resource.availability,
        resource.imagePath
    ];
    db.query(query, values, callback);

    // Get all resources
    exports.getResources = (callback)=>{
        const query = `SELECT * FROM resources`;
        db.query(query,callback)
    };

    //Delete a resource
    exports.deleteResource = (resourceId, callback)=>{
     const query = `DELETE FROM resources WHERE id =?`;
     db.query(query,[resourceId], callback);
    };
};