const db = require ('../config/db');

//add a new resource
exports.addResource = async(resourceData) =>{
 const query= `
        INSERT INTO resources 
        (provider_id, resource_type, description, location, price, availability, phone, image_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values =[
        resourceData.provider_id,
        resourceData.resource_type,
        resourceData.description,
        resourceData.location,
        resourceData.price,
        resourceData.availability,
        resourceData.phone,
        resourceData.image_path,
    ];
    const [result] = await db.query(query,values);
    return result;
};

//get all the resources by a provider
exports.getResourceByProvider = async (providerId) =>{
    const query = 'SELECT * FROM resources WHERE provider_id = ?';
    const [rows] = await db.query(query, [providerId]);
    return rows;
};

//delete a resource
exports.deleteResource = async (resourceId) =>{
    const query = 'DELETE FROM resources WHERE id = ?';
    const [result] = await db.query(query, [resourceId]);
    return result;
};