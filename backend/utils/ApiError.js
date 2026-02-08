

class ApiError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.status=this.statusCode>=400 && this.statusCode<500 ?'fail':'error';
        this.isOperational=this.statusCode<500?true:false;
     Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = ApiError