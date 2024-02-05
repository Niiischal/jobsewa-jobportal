const mongoose = require('mongoose');
module.exports = () => {
    try{
        mongoose.connect(process.env.mongo_url);
        console.log('Connected to database successfully...')
    }catch(error){
        console.log('Could not connect to database...',error)
    }
}