const asyncHandler = require("../../utils/asyncHandler");
const ApiError= require('../../utils/ApiError')
const mongoose = require('mongoose')
const Trip = require('../../models/trip.model')
const Bus = require('../../models/bus.models')
const allbustrips=asyncHandler(async(req,res)=>{
    const{routeName,slot}=req.body;
    let{limit,cursor}=req.query;
    limit=limit?parseInt(limit):10
    cursor=cursor?new mongoose.Types.ObjectId(cursor):null;
    if(!routeName){
        throw new ApiError(400,"All feilds are required")
    }else{
        routename=routeName.toLowerCase()
    }
      
    const bus=await Bus.findOne({routeName})
    if(!bus){
        throw new ApiError(404,'No such bus exists')
    }

    let tripQuery={bus:bus._id}
    tripQuery._id
    if(cursor){
        tripQuery._id={$lt:cursor
        }
    }
    if(slot){
        tripQuery.slot=slot;
    }
    const trips= await Trip.find(tripQuery).select('')
    .sort({_id:-1}).limit(limit+1).lean()
    let nextcursor= null
    if(trips.length>limit){
        const lasttrip=trips.pop()
        nextcursor=lasttrip._id
    }
    return res.status(200).json({trips,nextcursor})
})
module.exports=allbustrips;