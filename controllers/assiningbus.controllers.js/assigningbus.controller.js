const Bus = require('../../models/bus.models');
const User = require('../../models/user.models')
const busassigncontroller = async (req,res)=>{
    
    try{
    const {email,routeName}=req.body;
    if(!email||!routeName){
        return res.status(400).json({message:'All feilds are required'})
    }
         const bus = await Bus.findOneAndUpdate({routeName:routeName,
           $expr:{ $lt:['$presentStrength','$capacity']}
         },{$inc:{presentStrength:1}},{new:true})
     if(!bus){
        const newbus = await Bus.findOne({routeName:routeName})
        if(!newbus){
            return res.status(404).json({message:'No such bus exists for the route name '}) 
        }
        if(newbus.presentStrength>=newbus.capacity){
        return res.status(409).json({message:'bus capacity is full'})
        }
        return res.status(500).json({message:'Internal Server Error'});
     }
         const user = await User.findOneAndUpdate({email:email.trim().toLowerCase(),
            bus:null
         },{bus:bus._id},{new:true})
     if(!user){
        await Bus.findByIdAndUpdate(bus._id,{$inc:{presentStrength:-1}})
        const newUser = await User.findOne({email:email.trim().toLowerCase()})
        if(!newUser){
                   return res.status(404).json({message:'No such user exists'}) 
        }
        if(newUser?.bus){  
                 return res.status(409).json({message:'bus is already assigned'})
                }
                return res.status(500).json({message:'Internal Server Error'});
     }
    
    

     
     return res.status(200).json({message:'Bus assigned succesfully to User',
        user:{
            email:user.email,
            busRoute:bus.busNumber
        }
    })
    }catch(error){
        console.error('Error while assigning bus to user:',error);
        return res.status(500).json({message:'Internal server error '})
    }
}
module.exports = busassigncontroller;
// endpoints 
//1. assigned by using bus names not by bus ids or numbers
//2. no automatic assigning only admin can assign bus to users
//3.counting thing 
//4.not assigned based on distance names+
//issues 
// role checking is done in controller which may break sometimes so i think i should create  a middleware to check weather it is admin or not
//every bus document should store tthe numbers of users assigned to it 
// bus assigning should be done only if the bus is free
//