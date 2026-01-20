const mongoose = require('mongoose');
const Bus = require('../../models/bus.models');
const User= require('../../models/user.models')
const busassigningController= async(req,res)=>{
    const role= req.user.role;
    if(role != 'Admin'){
        return res.status(403).json({message:'Unauthorized request'})
    }
    try{
        const {busNumber,driverName,routeName,capacity}= req.body;
        if(!busNumber||!driverName||!routeName||!capacity){
            return res.status(400).json({message:'All feilds are required'})
        }
        const busdoc = await Bus.findOne({busNumber})
        if(busdoc){
            return res.status(409).json({message:'Bus number already exists'})
        }
        const bus = new Bus({
            busNumber:busNumber,
            driverName:driverName,
            routeName:routeName,
            capacity:capacity
        })
        await bus.save();
        return res.status(201).json({message:'New Bus registered succesfully'})
    }catch(error){
    return res.status(500).json({message:`Error while registering bus:${error.message}`})
    }
}
module.exports = busassigningController;