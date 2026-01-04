const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { access } = require('fs');
const loginRoute = (async(req,res,next)=>{
   const{username,email,password}=  req.body;
   if(!username||!email||!password){
    return res.status('400').json('message:All feilds are required')
   }
         try{
            const user = await User.findOneBy({email:email})
            if(!user){
                return res.status('400').json({message:'no such User exists'})
            }
            const comparePassword = bcrypt.compare(password,user.password)
            if(!comparePassword){
                return res.status(400).json({message:'Password is incorrect'})
            }
            const accessToken = User.generateAccessToken();
            const refreshToken = User.generateRefreshToken();
            user.refreshToken = refreshToken;
            await User.save();
            const options = {sameSite:'None',httpOnly:true,secure:false}
            res.cookie('accessToken',accessToken,options)
            .cookie('refreshToken',refreshToken,options)
            .status(200).json({message:'User logged in Succesfully'})
         }catch(error){
           throw new Error(error)
         }

})
module.exports= loginRoute