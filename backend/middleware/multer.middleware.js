const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage =multer.memoryStorage({})//stores file in RAM
    

const fileFilter=(req,file,cb)=>{
    const allowed=['image/jpeg','image/png','image/jpg']
    if(!(allowed.includes(file.mimetype) )){
         cb(new Error('only jpg or png  or jpeg format is allowed'),false)
    }else{
        cb(null,true);
    }
}
const upload = multer({storage,fileFilter,limits:{
    fileSize:5*1024*1024
}})//upload is the multer middeleware instance
module.exports = upload
//if it is disk storage it stores in req.file.path
// if it is in memory storage it stores in req.file.buffer
//avatar ,father mother photos memory storage
//documenst disk /s2 because heavy data buffer is not safe
//vidoes disk
