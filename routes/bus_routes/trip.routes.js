const Router = require('express').Router;
const app = Router();
const verifyJwt = require('../../middleware/auth.middleware') ;
const drivercheck =require('../../middleware/drivercheck.middleware') ;
const rolecheck= require('../../middleware/rolecheck.middleware')
const{allTrips}=require('../../controllers/bus.controllers/triprelatedbus.controllers')
   const driverbuscheck =require('../../middleware/driver_respective_bus.middleware') ;
 const { tripCreation } =require('../../controllers/bus.controllers/tripcreation.controllers') ;
 const { tripTransiction } =require('../../controllers/bus.controllers/tripcreation.controllers');
 const { tripCancelController } =require('../../controllers/bus.controllers/tripcreation.controllers') ;
const verifyJWT = require('../../middleware/auth.middleware');
 app.route('/tripcreate').post(verifyJwt,drivercheck,driverbuscheck,tripCreation);
 app.route('/tripTransiction').post(verifyJwt,drivercheck,driverbuscheck,tripTransiction)
 app.route('/tripCancel').post(verifyJwt,drivercheck,driverbuscheck,tripCancelController)
 app.route('/trips',verifyJWT,rolecheck,allTrips)
 module.exports = app;