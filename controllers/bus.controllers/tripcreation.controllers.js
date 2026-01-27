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
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    } 

    const fdate= new Date();
    const formattedDate= fdate.toLocaleDateString('en-CA',{
        timeZone:'Asia/kolkata'
    })
    const sdate = formattedDate.split("T")[0];
        const matchTrip = await Trip.findOne(
            {
                bus:bus._id,
                slot:slot,
                date: sdate 
            })
    if(matchTrip){
        return res.status(409).json({message:`Trip already exists for ${slot} for ${sdate} for ${routeName}`})
    }
    const newTrip= new Trip({
        bus:bus._id,
        statusCode:tripStatus.TO_BE_STARTED,
        slot:slot,
        date: sdate
    })
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
    const bus= await Bus.findOne({routeName:routeName.toLowerCase()})
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    }
    const date=new Date();
    const fdate = date.toLocaleDateString('en-CA',{
        timeZone:'Asia/kolkata'
    })
    const trip = await Trip.findOne({

            bus:bus._id,
            slot:slot,
            date:fdate
        
    });
    if(!trip){
        return res.status(404).json({message:'No such Trip exists'})
    }
    try{
   if(trip.statusCode ===tripStatus.CANCELED ||trip.statusCode==tripStatus.COMPLETED){
    return res.status(409).json({message:'Trip Transiction is not possible'})
   }
   const lastupdated = new Date(trip.updatedAt);

   const now = new Date();
 const difference = (now-lastupdated)/1000/60;
     if(difference<10){
     return res.status(429).json({message:'Trip status cannot be updated continously'})
    }
    const  next = nextstatus[trip.statusCode]
    if( (next) && (next.length>0)){
        trip.statusCode= next[0];
        await trip.save();
    return res.status(200).json({message:'Trip status updated succesfully',
        'currentStatus':TripStatusLabel[trip.statusCode]
    })
    }else{
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
   const trip = await Trip.findOne({_id:tripId})
     if(!trip){
        return res.status(404).json({message:'No such trip exists'})
     }
     const next = nextstatus[trip.statusCode]
     if( (next) && (next.length>0)){
     trip.statusCode= nextstatus[trip.statusCode][1];
   await trip.save();
 return res.status(200).json({message:'trip is succesfully canceled'})
     }
     else{
        return res.status(409).json({message:'Trip status cannot be updated further'})
    }
}catch(error){
    return res.status(500).json({message:`Internal Server Error ${error}`})
}
}
module.exports= {tripCreation,tripTransiction,tripCancelController};