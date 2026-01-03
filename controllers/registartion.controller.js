const mongoose= require('mongoose');
const User = require('../models/user.models')
const jwt = require('jsonwebtoken');
const registerController = async(async (req,res,next)=>{
    const {username,email,password,role}= req.body;
    if(!username||!email||!password||!role){
        return res.status(400).json('message: ALL FEILDS ARE REQUIRED')
    }
    try{
   const user = new User({
    username:username,
    email:email,
    password:password,
    role:role
   })
await user.save();
return res.status(201).json({message:'User registered succesfully'})
    }catch(error){
        throw new Error(error)
    }
    
})
module.exports = registerController;