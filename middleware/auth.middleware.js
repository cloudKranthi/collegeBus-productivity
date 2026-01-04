const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const verifyJWT = async(req,res,next)=>{
    
    const accessToken = req.cookies.accessToken||req?.headers['authorization']?.split(' ')[1];
    if(!accessToken){
        return res.status(401).json({message:'User not logged in'})
    }
    try{
        const compare = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(compare.userId);
       if(!user){
        return res.status(403).json({message:'Aunothorized request'})
       }
       req.user = user;
       next();
    }catch(error){
     return res.status(400).json({message:error})
    }
}
module.exports = verifyJWT;