const { match } = require('assert');
const Bus = require('../../models/bus.models')
const {Trip} = require('../../models/trip.model')
const {tripStatus}= require('../../models/trip.model')
const { nextstatus } = require('../../models/trip.model');
const { TripStatusLabel } = require('../../models/trip.model');
const tripCreation = async(req,res)=>{
    const{routeName,slot} = req.body;
     if(!routeName||!slot){
        return res.status(400).json({message:'All feilds are required'})
    }
    const bus = await Bus.findOne({routeName:routeName.toLowerCase()});
     // finding bus by routename 
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    } 

    const fdate= new Date();
    const formattedDate= fdate.toLocaleDateString('en-CA',{
        timeZone:'Asia/kolkata'
    })
    const sdate = formattedDate.split("T")[0];
       // getting current date in the format of yyyy-mm-dd
       // checking weather a trip exists for a particular bus particular slot particular date to prevent duplicate creation 
        const matchTrip = await Trip.findOne(
            {
                bus:bus._id,
                slot:slot,
                date: sdate 
            })
    if(matchTrip){
        return res.status(409).json({message:`Trip already exists for ${slot} for ${sdate} for ${routeName}`})
        //if matchTrip exixts then return conflict error
    }
    const newTrip= new Trip({
        bus:bus._id,
        statusCode:tripStatus.TO_BE_STARTED,
        slot:slot,
        date: sdate
    }) //create a new trip each trip has unique bus,slot(morning/evening),date 
    await newTrip.save();
    return res.status(201).json({message:'Trip created Succesfully',
        'tripId':newTrip._id,
        'slot':newTrip.slot,
        'date':newTrip.date
    })
}
const tripTransiction = async(req,res)=>{
    const {routeName,slot} = req.body;
    if(!routeName||!slot){
        return res.status(400).json({message:'All feilds are required'})
    }
    // finding bus by routeName 
    const bus= await Bus.findOne({routeName:routeName.toLowerCase()})
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    }
    const date=new Date();
    const fdate = date.toLocaleDateString('en-CA',{
        timeZone:'Asia/kolkata'
    })
    //getting current date in the format of yyyy-mm-dd
    //finding trip for a particular date,bus,slot
    const trip = await Trip.findOne({

            bus:bus._id,
            slot:slot,
            date:fdate
        
    });
    if(!trip){
        return res.status(404).json({message:'No such Trip exists'})
    }
    try{
         const status=trip.statusCode;
         // to prevent the transaction of cases when trip status is completed canceled 
   if(trip.statusCode ===tripStatus.CANCELED ||trip.statusCode==tripStatus.COMPLETED){
    return res.status(409).json({message:'Trip Transiction is not possible'})
   }
   
   if(trip.statusCode=== tripStatus.TO_BE_STARTED){
   const lastupdated = new Date(trip.updatedAt);
    // to prevent cases where there is a mistake of sending the double request to send another request minimum 10 minutes amount of time is required
   const now = new Date();
 const difference = (now-lastupdated)/1000/60;
     if(difference<10){
        // if difference is less than 10 minutes trip status isnt transited further
     return res.status(429).json({message:'Trip status cannot be updated continously'})
    }
}
 //finding the next step of the present trip status by using map nextStatus
    const  next = nextstatus[trip.statusCode]
     // this is kept for cases to double check cases like completd,canceled for thatr length is only 1 empty array
    if( (next) && (next.length>0)){
        // trip status is transited to next status 
        trip.statusCode= next[0];
        await trip.save();
        //returning the status after transition to the next status 
    return res.status(200).json({message:`Trip status updated succesfully from ${TripStatusLabel[status]} to ${TripStatusLabel[trip.statusCode]}by driver ${req.user.username} `,
        'currentStatus':TripStatusLabel[trip.statusCode]
    })
    }else{
        // this is for the cases where next status length is note more than 1 for cases canceled and completed 
        return res.status(409).json({message:'Trip status cannot be updated further'})
    } 
    
}catch(error){
    console.error(`Error while updating status code of trip${error}`)
   }
}
const tripCancelController = async(req,res)=>{
    const{tripId}= req.body;
    if(!tripId){
        return res.status(400).json({message:'All feilds are required'})
    }
try{
     // finding the trip by itrs id 
    const trip = await Trip.findOne({_id:tripId})
     if(!trip){
        return res.status(404).json({message:'No such trip exists'})
     }
     //finding the next status of the present trip status 
     const next = nextstatus[trip.statusCode]
     // trip can be cnaceled only if it is in the status to be started or on road so it i schecked by the condition if length is more than 1
     if( (next) && (next.length>0)){
        // trip status is set to canceled 
     trip.statusCode= nextstatus[trip.statusCode][1];
     await trip.save();
     return res.status(200).json({message:'trip is succesfully canceled'})
     }
     else{
        // this is to prevent cancelling of the cases like completed and cancled trips 
        return res.status(409).json({message:'Trip status cannot be updated further'})
    }
}catch(error){
    return res.status(500).json({message:`Internal Server Error ${error}`})
}
}
module.exports= {tripCreation,tripTransiction,tripCancelController};