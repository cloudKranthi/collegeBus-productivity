const Bus = require('../../models/bus.models')
const Trip = require('../../models/trip.model')
const tripCreation = async(req,res)=>{
    const{routeName} = req.body;
    const bus = await Bus.findOne({routeName:routeName});
    if(!bus){
        return res.status(404).json({message:'No such Bus present'})
    }
    const newTrip= new Trip({
        bus:bus._id,
        status:'ToBestarted'
    })
    await newTrip.save()
    return res.status(201).json({message:'Trip created Succesfully'})
}
module.exports= tripCreation;