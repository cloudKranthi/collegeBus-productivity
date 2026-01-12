const Bus = require('../../models/bus.models');
const User = require('../../models/user.models')
const busassigncontroller = async (req,res)=>{
    const role = req.user.role;
    if(role !='Admin'){
        return res.status(403).json({message:'Unauthorized request'});
    }
    try{
    const {email,routeName}=req.body;
    if(!email ||!routeName){
        return res.status(400).json({message:'All feilds are required'})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:'No such user exists'})
    }
     const bus = await Bus.findOne({routeName})
     if(!bus){
        return res.status(404).json({message:'No such bus exists for the route name '})
     }
     const capacity = await User.aggregate([{$}])
     
     user.bus = bus._id;
     await user.save();
     return res.status(200).json({message:'Bus assigned succesfully to User'})
    }catch(error){
        return res.status(500).json({message:'Internal server error '})
    }
}
module.exports = busassigncontroller;
// endpoints 
//1. assigned by using bus names not by bus ids or numbers
//2. no automatic assigning only admin can assign bus to users
//3.counting thing 
//4.not assigned based on distance names
