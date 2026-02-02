const express = require('express');
const app = express.Router();
const UserDetails = require('../../controllers/updatedetails.controllers.js/userdetails.controller')
const verifyJwt= require('../../middleware/auth.middleware')
const rolecheck= require('../../middleware/studentcheck.middeleware')
const upload = require('../../middleware/multer.middleware');
const verifyJWT = require('../../middleware/auth.middleware');
const uploaduser = require('../../controllers/updatedetails.controllers.js/uploadimage')
const parentphoto=require('../../controllers/updatedetails.controllers.js/uploadparentdetails')
app.route('/avatar').post(verifyJwt,upload.single('avatar'),uploaduser)
app.route('/studentProfile').patch(verifyJwt,rolecheck,upload.single('photo'),parentphoto)
module.exports=app;