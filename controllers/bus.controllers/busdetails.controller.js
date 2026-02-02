const Bus = require('../../models/bus.models');
const mongoose = require('mongoose');
const asyncHandler = require('../../utils/asyncHandler')
const User = require('../../models/user.models');
const busdetailsController= asyncHandler(async(req,res)=>{
    const {routeName} = req.body;
    let{cursor,limit}=req.query;
    if(cursor){
     cursor = new  mongoose.Types.ObjectId(cursor);
    }
    else{
        cursor=null
    }
     //find the bus with the routename
    const bus = await Bus.findOne({routeName:routeName.toLowerCase()});
    if(!bus){
        return res.status(404).json({message:'No such Bus exists'});
    } 
      limit =limit?parseInt(limit):10

    // used aggreaggation pipelines to get the users for the respective routeName bus 
    let pipeline = [{
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
            $unwind:"bususers"
        }
]
    if(cursor){
      pipeline.push({$match:
         {"bususers._id":{$lt:cursor}}})
    }
    pipeline.push(        {
            $sort:{'bususers._id':-1}
        },
        {$limit:limit+1},

        
        {
            $project:{
            // give the final json body with username email created at 
            "username":"$bususers.username",
            "email":"$bususers.email",
            "createdAt":"$bususers.createdAt",
            "updatedAt":"$bususers.updatedAt",
            "_id":"$bususers._id",
            isfull:"$isfull"

        } }  )
    let  users=await Bus.aggregate(pipeline)

    let nextCursor=null
    if(users.length>limit){
        const lastUser=users.pop();
        nextCursor=lastUser._id
    }

    res.status(200).json({users,nextCursor})
})
module.exports = busdetailsController;