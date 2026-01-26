const express= require('express');
const app = express.Router();
const verifyJwt= require('../../middleware/auth.middleware')
const drivercheck= require('../../middleware/drivercheck.middleware')
 const {tripCreation}= require('../../controllers/bus.controllers/tripcreation.controllers')
 const {tripTransiction}= require('../../controllers/bus.controllers/tripcreation.controllers')
 app.route('/tripcreate').post(verifyJwt,drivercheck,tripCreation);
 app.route('/tripTransiction').post(verifyJwt,drivercheck,tripTransiction)
 module.exports= app;