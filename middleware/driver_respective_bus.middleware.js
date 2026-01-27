const {Trip} = require('../models/trip.model')
const User = require('../models/user.models')
const Bus = require('../models/bus.models')
const driverCheckBus= async(req,res,next)=>{
    try{
      const {driverName,routeName}= req.body
     if(!driverName||!routeName){
        return res.status(400).json({message:'All fields are required'})
     }
     const bus1= await Bus.findOne({driverName:driverName,routeName:routeName})
     if(!bus1 ){
        return res.status(403).json({message:`Aunothirized request bus driver cant access this ${routeName} bus `})
     }
     next();
    }catch(error){

    }
}
module.exports= driverCheckBus;