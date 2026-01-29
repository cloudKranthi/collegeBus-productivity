const mongoose = require('mongoose')
require('dotenv').config();
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    avatar:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Admin','Driver'],
            default:"Student"
    },
    refreshToken:{
        type:String
    },
    bus:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus'
    }
},{timestamps:true})
UserSchema.pre('save',async function(){
    if(this.isModified('password')){
        this.password =  await bcrypt.hash(this.password,10)
    
    }
    return;
})
UserSchema.methods.generateAccessToken =  function(){
 return  jwt.sign({_id:this._id,
    email:this.email,
    role:this.role
  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({_id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
//indexing is added to prevent race conditions duplicate conditions
UserSchema.index({
    bus:1,slot:1,date:-1
},{unique:true})
module.exports = mongoose.model('User',UserSchema)