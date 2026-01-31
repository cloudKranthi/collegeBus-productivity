const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage =multer.memoryStorage({})
    const filename=(req,file,cb)=>{
        const uniqueName= Date.now()+'-'+file.originalname
        cb(null,uniqueName)
    }

const fileFilter=(req,file,cb)=>{
    const allowed=['image/jpeg','image/png','image/jpg']
    if(!(allowed.includes(file.mimetype) )){
         cb(new Error('only jpg or png  or jpeg format is allowed'),false)
    }else{
        cb(null,true);
    }
}
const upload = multer({storage,filename,fileFilter,limits:{
    fileSize:5*1024*1024
}})
module.exports = upload