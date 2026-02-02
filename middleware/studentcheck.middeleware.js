const rolecheckmiddleware = async(req,res,next)=>{
    const user = req.user;
    if(!user){
        return res.status(401).json({message:'user not logged in'})
    }
    try{
    const role = user.role.trim().toLowerCase();
    if(role!='student'){
        return res.status(403).json({message:'forbidden request'})
    }
    next();
    }
    catch(error){
     return res.status(500).json({message:`Internal server error ${error}`})
    }
}
module.exports= rolecheckmiddleware;