const mongoose = require('mongoose');
connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_DB_URI)
       console.log('Mongo db connected succesfully')
    }catch(error){
        console.log(`error in connecting database ${error}`)
    }
}
module.exports = connectDB