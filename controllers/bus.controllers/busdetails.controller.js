const Bus = require('../../models/bus.models');
const mongoose = require('mongoose')
const User = require('../../models/user.models');
const busdetailsController= async(req,res)=>{
    const {routeName} = req.body;
    const bus = await Bus.findOne({routeName:routeName});
    if(!bus){
        return res.status(404).json({message:'No such Bus exists'})
    }
    const users = await Bus.aggregate([{
        $match:{
            "routeName":routeName
        }
    },{
        $lookup:{
            from:'users',
            localField:"_id",
            foreignField:"bus",
            as:"bususers"
        }},{
            $addFields:{
                isfull:{
                    $cond:{
                        if:{
                            $gte:["$presentStrength","$capacity"]
                        }
                        ,
                        then:true,
                        else:false
                    }  
                }
            }
        },{$project:{
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