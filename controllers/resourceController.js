const db = require ('../config/db');

//Get all resources
exports.getResources = async ( req,res) =>{
    try{
        const [ resources] = await db.promise().query('SELECT * FROM resources WHERE availability = 1');
        res.status(200).json(resources);
    } catch(error){
        console.error('Error fething resources:', error);
        res.status(500).json({error: 'Failed to fetch rsources'});
    }
};