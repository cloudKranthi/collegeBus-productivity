const Bus = require('../../models/bus.models')
const Trip = require('../../models/trip.model')
const tripCreation = async(req,res)=>{
    const{routeName,slot} = req.body;
     if(!routeName||!slot){
        return res.status(400).json({message:'All feilds are required'})
    }
    const bus = await Bus.findOne({routeName:routeName});
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    } 

    const fdate= new Date();
    const formattedDate= fdate.toLocaleDateString('en-CA',{
        timeZone:'Asia/kolkata'
    })
    const sdate = formattedDate.split("T")[0];
        const matchTrip = await Trip.aggregate([
        {
            $match:{
                bus:bus._id,
                slot:slot,
                date: sdate 
            }
        }
    ])
    if(matchTrip){
        return res.status(409).json({message:`Trip already exists for ${slot} for ${sdate} for ${routeName}`})
    }
    const newTrip= new Trip({
        bus:bus._id,
        status:'ToBeStarted',
        statusCode:0,
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
    const {routeName,slot,date} = req.body;
    if(!route){
        return res.status(400).json({message:'All feilds are required'})
    }
    const trip = await Trip.findById(tripId);
    if(!trip){
        return res.status(404).json({message:'No such Trip exists'})
    }
    try{
   trip.statusCode= trip.statusCode+1;
   if(trip.statusCode ===1){
    trip.status ='OnRoad';
    await trip.save();
    return res.status(200).json({message:'Trip status updated succesfully',
        'currentStatus':trip.status
    })
   }
   if(trip.statusCode ===2){
    trip.status ='Completed';
    await trip.save();
    return res.status(201).json({message:`${trip.slot} Trip completed succesfully`})
   }}catch(error){
    console.error(`Error while updating status code of trip${error}`)
   }
}
module.exports= {tripCreation,tripTransiction};