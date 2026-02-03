const asyncHandler=require('../../utils/asyncHandler')
const ApiError= require('../../utils/ApiError')
const User = require('../../models/user.models')
const cloudinary = require('cloudinary')
const streamifier = require('streamifier')
const parentphoto= asyncHandler(async(req,res)=>{
    const{type}=req.query;
    if(!req.file){
        throw new ApiError(400,'No file uploaded')
    }
    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404,'No user,found')
    }
    const result= await new Promise((resolve,reject)=>{
        const uploadStream= cloudinary.uploader.upload_stream({folder:'avatar'},(error,result)=>{
            if(error){
                return reject(error)
            }else{
                return resolve(result);
            }
        })
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream)
    })
    if(!result.secure_url||!result.public_id){
        throw new ApiError(500,'Cloudinary upload failed')
    }
    if(user.studentProfile.type?.public_id){
      await cloudinary.uploader.destroy(user.studentProfile.type.public_id)
    }
    user.studentProfile.type.url=result.secure_url;
    user.studentProfile.type.public_id=result.public_id;
    await user.save();
    res.status(200).json({message:`${type} photo uploaded`,
    secure_url:result.secure_url
    })
})
module.exports={parentphoto}