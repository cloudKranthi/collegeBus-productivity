const jwt = require('jsonwebtoken')
const User = require('../../models/user.models')
const logoutController= async(req,res)=>{
        const options={httpOnly:true,sameSite:'None',secure:true}
    const accessToken= req.cookies.accessToken;

    try{
    const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

    if(decoded?._id){
        const user = await User.findByIdAndUpdate(decoded._id,{refreshToken:''});
     } 
     

return res.status(200).clearCookie('accessToken',options).clearCookie('refreshToken',options).json({message:'User logged out succesfully '})
}
catch(error){
    console.error(error);
return res.status(200).clearCookie('accessToken',options).clearCookie('refreshToken',options).json({message:'User logged out succesfully '})
}
}
module.exports = logoutController;