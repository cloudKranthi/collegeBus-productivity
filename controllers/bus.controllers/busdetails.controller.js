const Bus = require('../../models/bus.models');
const mongoose = require('mongoose')
const User = require('../../models/user.models');
const busdetailsController= async(req,res)=>{
    const {routeName} = req.body;
    //find the bus with the routename
    const bus = await Bus.findOne({routeName:routeName});
    if(!bus){
        return res.status(404).json({message:'No such Bus exists'});
    } 
  

    // used aggreaggation pipelines to get the users for the respective routeName bus 
    const users = await Bus.aggregate([{
        $match:{
            //match the bus   with corresponding  routeName 
            "routeName":routeName.toLowerCase()
        }
     },
     {
        //lookup from users match with assigned ones 
        $lookup:{
            from:'users',
            localField:"_id",
            foreignField:"bus",
            as:"bususers"
        }}
        ,{
            $addFields:{
                //added another is full tro see weather strength is full further more students are added or not 
                isfull:{
                    $cond:{
                        if:{
                            //condition of the ste
                            $gte:["$presentStrength","$capacity"]
                        }
                        ,
                        then:true,
                        else:false
                    }  
                }
            }
        },
        {
            $project:{
            // give the final json body with username email created at 
            "bususers.username":1,
            "bususers.email":1,
            "bususers.createdAt":1,
            "bususers.updatedAt":1,
            "bususers._id":0,
            isfull:1

        }      
    }
    ])
    res.status(200).json({users})
}
module.exports = busdetailsController;