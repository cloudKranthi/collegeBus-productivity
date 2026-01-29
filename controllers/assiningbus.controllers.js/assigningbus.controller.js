const Bus = require('../../models/bus.models');
const User = require('../../models/user.models');
const busassigncontroller = async (req,res)=>{
    //mongoose transactions are used because two documents are need to be updated at a time 
    const session = await mongoose.startSession();
     //start the session 
       session.startTransaction();
    try{

    const {email,routeName}=req.body;
    if(!email||!routeName){
        return res.status(400).json({message:'All feilds are required'})
    }
    //find bus with routename and check only for cases where present Strength is more than capacity increment the present Strength 
         const bus = await Bus.findOneAndUpdate({routeName:routeName.toLowerCase(),
           $expr:{ $lt:['$presentStrength','$capacity']}
         },{$inc:{presentStrength:1}},{new:true})
        if(!bus){
         
            return res.status(404).json({message:'No such bus exists for the route name '}) 
        }
        //find the user with the email and to be checked that bus is not assigned to it  and update the field with bus id 
         const user = await User.findOneAndUpdate({email:email.trim().toLowerCase(),
            bus:null
         },{bus:bus._id},{new:true})
     if(!user){
        //to check where did th error come from weather user didmt exist or already bus was assigned to the user 
        const newUser = await User.findOne({email:email.trim().toLowerCase()})
        if(!newUser){
            // no user found
                   return res.status(404).json({message:'No such user exists'}) 
        }
        if(newUser?.bus){  
            //already bus is assigned to it 
                 return res.status(409).json({message:'bus is already assigned'})
                }
                return res.status(500).json({message:'Internal Server Error'});
     }
    
    
      //commit and end the session 
      session.commitTransaction();
      session.endSession();
     return res.status(200).json({message:'Bus assigned succesfully to User',
        user:{
            email:user.email,
            busRoute:bus.busNumber
        }
    })
    }catch(error){
        //abort the session it doesnt update any field it just aborts the transiction without any change 
        session.abortTransaction();
        session.endSession();
        console.error('Error while assigning bus to user:',error);
        return res.status(500).json({message:'Internal server error '})
    }
}
module.exports = busassigncontroller;
// endpoints 
//1. assigned by using bus names not by bus ids or numbers
//2. no automatic assigning only admin can assign bus to users
//3.counting thing 
//4.not assigned based on distance names
//issues 
// role checking is done in controller which may break sometimes so i think i should create  a middleware to check weather it is admin or not
//every bus document should store tthe numbers of users assigned to it 
// bus assigning should be done only if the bus is free
