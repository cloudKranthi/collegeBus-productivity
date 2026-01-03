const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserSchema = new mongose.Schema({
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
        type:Enum,
        default:"Student",
        enum:['Student','Teacher']
    },
    refreshToken:{
        type:String
    },
    busNumber:{
        type:Number,
        required:true
    },
    bus:{
        type:Schema.Types.ObjectId,
        ref:'Bus'
    }
})
UserSchema.pre('save',async function(next){
    if(this.isModified(password)){
        password = this.password
    }
    next();
})
UserSchema.methods.generateAccessToken = async function(){
    const userId= this._id;
    const username = this.username;
    const email = this.email;
  jwt.sign({id:this._id
  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY,sameSite:none})
}
UserSchema.methods.generateRefreshToken = async function(){
    jwt.sign({id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY,sameSite:none})
}
module.exports = mongoose.model('User',UserSchema)