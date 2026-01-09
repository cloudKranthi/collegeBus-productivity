const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const logoutController= async(req,res,next)=>{
    const refreshToken= req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:'User not logged in'});
    }
    const options={httpOnly:true,sameSite:'None',secure:true}
    try{
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    if(!user){
        throw new Error('no such user exists')
    }
    user.refreshToken ='';
    await user.save();

return res.status(200).clearCookie('accessToken',options).clearCookie('refreshToken',options).json({message:'User logged out succesfully'})
}
catch(error){
return res.status(200).clearCookie('accessToken',options).clearCookie('refreshToken',options).json({message:'User logged out succesfully'})
}
}
module.exports = logoutController;