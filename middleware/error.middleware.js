require('dotenv').config();
const ApiError = require('../utils/ApiError');
const errorHandler =(err,req,res,next)=>{
    let error = err;
    if(error.name==='CastError'){
        error = new ApiError(400,'Invalid Id format');
    }
    if(error.name==='ValidationError'){
        const messages= Object.values(error.errors).map(e=>e.message);
        error = new ApiError(409,messages.join(', '))
    }
    if(error.code===11000){
        const field =Object.keys(error.keyValue)[0];
        error = new ApiError(422,`${field} already exists`);
    }
    if(!(error instanceof ApiError)){
        error=  new ApiError(500,error.message||'Internal Server error');
        error.isOperational=false;
    }
    
    const response={ 
        success:false,
        message:error.isOperational?
        error.message:'Internal Server Error'

    }
    if(process.env.NODE_ENV==='development'){
     response.stack=error.stack     
    }

 const logError={
    ...response,
        time:new Date().toISOString(),
        method:req.method,
        route:req.originalUrl,
        requestId:req.requestId
 }
    if(!error.isOperational){
        console.error("[FATAL]",logError)
    }
    else{
        console.error("[OPERATIONAL]",logError)
    }

    return res.status(error.statusCode).json(response);
}
module.exports = errorHandler;