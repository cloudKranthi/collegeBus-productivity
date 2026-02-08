const express = require('express');
const path = require('path')
const router= express.Router();
const  verifyJWT= require('../../middleware/auth.middleware.js');
const rolecheck = require('../../middleware/rolecheck.middleware.js')
const busStudentDetails= require('../../controllers/bus.controllers/busdetails.controller.js')
const  busregisteringController = require( '../../controllers/assiningbus.controllers/registerbus.controllers.js');
const assignbus = require('../../controllers/assiningbus.controllers/assigningbus.controller.js')
const {bustrips}=require('../../controllers/bus.controllers/triprelatedbus.controllers.js')
router.route('/registerbus').post(verifyJWT,rolecheck,busregisteringController);
router.route('/busassign').post(verifyJWT,rolecheck,assignbus);
router.route('/busStudentDetails',verifyJWT,rolecheck,busStudentDetails)
module.exports = router;