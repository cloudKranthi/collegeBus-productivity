const express= require('express');
const app = express.Router();
const verifyJwt= require('../../middleware/auth.middleware')
const drivercheck= require('../../middleware/drivercheck.middleware')
const driverbuscheck = require('../../middleware/driver_respective_bus.middleware')
 const {tripCreation}= require('../../controllers/bus.controllers/tripcreation.controllers')
 const {tripTransiction}= require('../../controllers/bus.controllers/tripcreation.controllers')
 const {tripCancel}= require('../../controllers/bus.controllers/tripcreation.controllers')
 app.route('/tripcreate').post(verifyJwt,drivercheck,driverbuscheck,tripCreation);
 app.route('/tripTransiction').post(verifyJwt,drivercheck,driverbuscheck,tripTransiction)
 app.route('/tripCancel').post(verifyJwt,drivercheck,driverbuscheck,tripCancel)
 module.exports = app;