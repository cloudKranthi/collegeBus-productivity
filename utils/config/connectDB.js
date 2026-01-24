const mongoose = require('mongoose');
require('dotenv').config();
connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_DB_URI,{
        serverSelectionTimeoutMS:10000
       })
       console.log('Mongo db connected succesfully')
       
    }catch(error){
        console.log(error);
    }
}
module.exports = connectDB