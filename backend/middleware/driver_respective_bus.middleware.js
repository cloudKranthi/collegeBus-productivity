const {Trip} = require('../models/trip.model')
const User = require('../models/user.models')
const Bus = require('../models/bus.models')
const driverCheckBus= async(req,res,next)=>{
    try{
      const {routeName}= req.body
     if(!routeName){
        return res.status(400).json({message:'All fields are required'})
     }
     driverName=req.user._id;
     const bus1= await Bus.findOne({driverName:driverName})
      const bus2= await Bus.findOne({routeName:routeName.toLowerCase()})
      if(!bus1){
         return res.status(404).json({message:'No such driver  user exists '})
      }
      if(!bus2){
         return res.status(404).json({message:'No such bus exists with repsective routeName'})
      }
     if(bus1.routeName!=bus2.routeName){
        return res.status(403).json({message:`Unauthorized request bus driver cant access this ${routeName} bus `})
     }
     next();
    }catch(error){
         return res.status(500).json({message:`Internal server error${error}`})
    }
}
module.exports= driverCheckBus;