const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
        enum:['Student','Admin'],
            default:"Student"
    },
    refreshToken:{
        type:String
    },
    bus:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus'
    }
})
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password =  await bcrypt.hash(this.password,10)
    
    }
    next();
})
UserSchema.methods.generateAccessToken = async function(){
    const userId= this._id;
    const username = this.username;
    const email = this.email;
 return  jwt.sign({id:this._id
  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}
UserSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
module.exports = mongoose.model('User',UserSchema)