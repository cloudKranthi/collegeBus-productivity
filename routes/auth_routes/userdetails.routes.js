const express = require('express');
const app = express.Router();
const UserDetails = require('../../controllers/updatedetails.controllers.js/userdetails.controller')
const verifyJwt= require('../../middleware/auth.middleware')
const rolecheck= require('../../middleware/rolecheck.middleware')
app.route('/userinfo').post(verifyJwt,rolecheck,UserDetails)
module.exports=app;