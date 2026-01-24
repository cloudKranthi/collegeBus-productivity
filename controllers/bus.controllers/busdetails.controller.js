const Bus = require('../../models/bus.models');
const mongoose = require('mongoose')
const User = require('../../models/user.models');
const busdetailsController= async(req,res)=>{
    const {routeName} = req.body;
    const bus = await Bus.findOne({routeName:routeName});
    if(!bus){
        return res.status(404).json({message:'No such Bus exists'})
    }
    const users = await User.aggregate([{
        $match:{
            bus:new mongoose.Types.ObjectId(bus._id)
        }},{$project:{
            username:1,
            email:1,
            createdAt:1,
            updatedAt:1,
            _id:0
        }
    }
    ])
    res.status(200).json({users})
}
module.exports = busdetailsController;