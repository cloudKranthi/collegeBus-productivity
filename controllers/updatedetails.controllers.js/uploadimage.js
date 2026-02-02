const asyncHandller= require('../../utils/asyncHandler')
const ApiError= require('../../utils/ApiError')
const fs = require('fs');
const cloudinary = require('../../utils/config/cloudinary')
const streamifier = require('streamifier')
const User= require('../../models/user.models')
const uploadimage = asyncHandller(async(req,res)=>{
    if(!req.file){
        throw new ApiError(400,'No File uploaded');
    }
    const user = await User.findById(req.user._id);
     if(!user){
        throw new ApiError(404,'No such user present')
     }
    
    const result = await new Promise((resolve,reject)=>{
    const uploadstream =cloudinary.uploader.upload_stream({folder:'avatar'},(error,result)=>{
        if(error) return reject(error) 
        else return resolve(result)
    })
    streamifier.createReadStream(req.file.buffer).pipe(uploadstream)
   })
    if(!result?.secure_url||!result?.public_id){
        throw new ApiError(500,'file upload failed')
    }
    if(user.avatar?.public_id){
        await cloudinary.uploader.destroy(user.avatar.public_id)
    }
   const avatar={
    secure_url:result.secure_url,
    public_id:result.public_id
   }
    user.avatar=avatar;
    await user.save();
   
    res.status(200).json({message:'File uploaded succesfully',secure_url:result.secure_url,
        public_id:result.public_id
    })
})
module.exports = uploadimage