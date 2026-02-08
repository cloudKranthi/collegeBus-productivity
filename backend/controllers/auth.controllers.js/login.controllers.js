const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user.models')
const jwt = require('jsonwebtoken');
const { access } = require('fs');
const loginRoute = (async(req,res,next)=>{
   const{username,email,password}=  req.body;
   if(!username||!email||!password){
    return res.status('400').json('message:All feilds are required')
   }
         try{
            //find user with the email
            const user = await User.findOne({email:email.trim().toLowerCase()})
            if(!user){
                //return error when no user exists
                return res.status('404').json({message:'no such User exists'})
            }
            //compare with password 
            const comparePassword = bcrypt.compare(password,user.password)
            if(!comparePassword){
                return res.status(401).json({message:'Password is incorrect'})
            } 
            //generate accessToken and refreshToken
            const accessToken = user.generateAccessToken(); 
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken;
            await user.save();
            const options = {sameSite:'lax',httpOnly:true,secure:false}
            //set  accesscokies and refreshcookies 
            res.cookie('accessToken',accessToken,options)
            .cookie('refreshToken',refreshToken,options)
            .status(200).json({message:'User logged in Succesfully'})
         }catch(error){
           throw new Error(error)
         }

})
module.exports= loginRoute