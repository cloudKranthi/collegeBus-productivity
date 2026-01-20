const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./user.models')
const busSchema = new mongoose.Schema(
    {
        busNumber:{
            type:Number,
            required:true,
            unique:true
        },
        driverName:{
            type:String
        },
        routeName:{
            type:String,
            required:true,
            unique:true,
            index:true,
            lowercase:true
        },
        capacity:{
            type:Number,
            required:true,
        },
        presentStrength:{
            type:Number,
            default:0
        },
        students:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }]
    }
)
module.exports = mongoose.model('Bus',busSchema)