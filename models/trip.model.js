const mongoose = require('mongoose');
const Bus = require('../models/bus.models');
const { ref } = require('process');
const { format } = require('path');
const tripSchema = new mongoose.Schema({
    bus:{
        type: mongoose.Schema.Types.ObjectId,
    ref:'Bus'
    },
    status:{
        type:String,
        enum:['ToBeStarted','OnRoad','Completed','Cancelled'],
        default:'ToBeStarted'
    },
    statusCode:{
        type:Number
    },
    slot:{
        type:String,
        enum:['Morning','Evening']
    },
    date:{
        type:String

    }
},{timestamps:true})
module.exports=mongoose.model('Trip',tripSchema)