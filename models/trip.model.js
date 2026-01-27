const mongoose = require('mongoose');
const Bus = require('../models/bus.models');
const { ref } = require('process');
const { format } = require('path');
const tripStatus ={
    'TO_BE_STARTED':0,
    'ON_ROAD':1,
    'COMPLETED':2,
    'CANCELED':-1
}
const nextstatus ={
    [tripStatus.TO_BE_STARTED]:[tripStatus.ON_ROAD,tripStatus.CANCELED],
    [tripStatus.ON_ROAD]:[tripStatus.COMPLETED,tripStatus.CANCELED],
    [tripStatus.COMPLETED]:[],
    [tripStatus.CANCELED]:[]
}
const TripStatusLabel ={
    '-1':'Canceled',
    '0':'To be started',
    '1':'On Road',
    '2':'Completed',
    
}
const tripSchema = new mongoose.Schema({
    bus:{
        type: mongoose.Schema.Types.ObjectId,
    ref:'Bus'
    },
    statusCode:{
        type:Number,
        default:tripStatus.TO_BE_STARTED
    },
    slot:{
        type:String,
        enum:['Morning','Evening']
    },
    date:{
        type:String

    }
},{timestamps:true})
const Trip = mongoose.model('Trip',tripSchema)
module.exports={Trip,tripStatus,nextstatus,TripStatusLabel}