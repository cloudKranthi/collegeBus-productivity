const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const busSchema = new mongoose.Schema(
    {
        busNumber:{
            type:Number,
            required:true,
            unique:true
        },
        driverName:{
            type:String
        }
    }
)
module.exports = mongoose.model('Bus',busSchema)