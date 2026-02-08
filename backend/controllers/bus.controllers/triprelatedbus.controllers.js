const asyncHandler = require("../../utils/asyncHandler");
const ApiError= require('../../utils/asyncHandler')
const mongoose = require('mongoose')
const Trip = require('../../models/trip.model')
const Bus = require('../../models/bus.models')
exports.bustrips=asyncHandler(async(req,res)=>{
   
    let{routeName,slot,date}=req.body;
    let{limit,cursor}=req.query;
    
    limit=limit?parseInt(limit):10
    cursor=cursor?new mongoose.Types.ObjectId(cursor):null;
    if(!routeName){
        throw new ApiError(400,"All feilds are required")
    }else{
        routeName=routeName.toLowerCase()
    }
    if(cursor &&!mongoose.Types.ObjectId.isValid(cursor)){
           throw new ApiError(400,'Invalid cursor')
    }
      try{
    const bus=await Bus.findOne({routeName})
    if(!bus){
        throw new ApiError(404,'No such bus exists')
    }

    let tripQuery={bus:bus._id}
    if(cursor){
        tripQuery._id={$lt:cursor
        }
    }
    if(slot){
        tripQuery.slot=slot;
    }
    if(date){
        tripQuery.date=date;
      }
    const trips= await Trip.find(tripQuery)
    .sort({_id:-1}).limit(limit+1).lean()
    let nextcursor= null
    if(trips.length>limit){
        const lasttrip=trips.pop()
        nextcursor=lasttrip._id
    }
    return res.status(200).json({trips,nextcursor})
}catch(error){
    throw new ApiError(500,'Internal server error')
}
})
exports.allTrips=asyncHandler(async(req,res)=>{
    const{slot,date}=req.body;
    const{cursor,limit}=req.query;
    if(cursor){
        cursor= new mongoose.Types.ObjectId(cursor);
    }else{
        cursor=null;
    }
    limit=limit?parseInt(limit):10;
    const tripQuery={date:date}
    if(cursor){
        tripQuery._id={$lt:{cursor}}
    }
    if(slot){
        tripQuery.slot=slot;
    }
    const trips =await Trip.find(tripQuery);
    trips.sort({_id:-1}).limit(limit+1).lace();
    let nextCursor=null;
    if(trips.length>limit){
        let nexttripid= trips.pop();
         nextCursor=nexttripid._id;
    }
    return res.status(200).json({trips,nextCursor})
})
