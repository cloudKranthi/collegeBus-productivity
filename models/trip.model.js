const mongoose = require('mongoose');
const Bus = require('../models/bus.models');
const { ref } = require('process');
const tripSchema = new mongoose.Schema({
    bus:{
        type: mongoose.Schema.Types.ObjectId,
    ref:'Bus'
    },
    status:{
        type:String,
        enum:['started','OnRoad','Completed','ToBeStarted','Canceled']
    }
},{timestamps:true})
module.exports=mongoose.model('Trip',tripSchema)