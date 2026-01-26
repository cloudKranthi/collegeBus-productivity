const User = require('../../models/user.models');
const UserDetails= async(req,res)=>{
    const{email}= req.body;
    if(!email){
        return res.status(400).json({message:'Email is required'})
    }
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).json({message:'No such user exists'})
    }
    return res.status(200).json({user})
}
module.exports = UserDetails