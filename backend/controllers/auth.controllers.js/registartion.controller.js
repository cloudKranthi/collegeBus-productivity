const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('../../models/user.models')
const jwt = require('jsonwebtoken');
const registerController = async (req,res,next)=>{
    const {username,email,password,role}= req.body;
    if(!username||!email||!password){
        return res.status(400).json({message: 'ALL FEILDS ARE REQUIRED'})
    }
    try{
   const user = new User({
    username:username,
    email:email.trim().toLowerCase(),
    password:password,
    role:role

   })
await user.save();

return res.status(201).json({message:'User registered succesfully'})
    }catch(error){
        next(error);

    }
    
}
module.exports = registerController;