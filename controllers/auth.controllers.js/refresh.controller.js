const User = require('../../models/user.models')
const jwt = require('jsonwebtoken')
const refreshController= async(req,res,next)=>{
const refreshToken = req.cookies.refreshToken;
if(!refreshToken){
    return res.status(401).json({message: 'User not logged in'})
}
try{
const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const options = {sameSite:'None',httpOnly:true,secure:true};
  
const user = await User.findById(decoded.userId);
if(!user){
    throw new Error('No such User exist')
}
if(user.refreshToken !== refreshToken){
    return res.status(403).clearCookie('refreshToken',options).clearCookie('accessToken',options).json({message:'refresh token doesnot exist please login again'})
}
const newAccessToken = user.generateAccessToken();
const newRefreshToken=user.generateRefreshToken();
user.refreshToken= newRefreshToken;
await user.save();
return res.status(200).cookie('accessToken',newAccessToken,options).cookie('refreshToken',newRefreshToken,options).json({message:'acess token refreshed succesfully'})
}catch(error){
    const options = {sameSite:'None',httpOnly:true,secure:true};

      return res.clearCookie('refreshToken',options).clearCookie('accessToken',options).json({message:'refresh token doesnot exist please login again'})

}
};
module.exports = refreshController;
// 1.take refresh Token from the cookies  2.verify the refresh token secret 3.if not matched force logout clear all the cookies 
// 4. take user details from that token 5.generate new access token and refresh token 
//7. save it and send both as response