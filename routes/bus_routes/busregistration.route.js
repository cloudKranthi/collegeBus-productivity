const express = require('express');
const router= express.Router();
const busdetails= require('../../controllers/bus.controllers/busdetails.controller.js')
const  verifyJWT= require('../../middleware/auth.middleware.js');
const rolecheck = require('../../middleware/rolecheck.middleware.js')
const  busregisteringController = require( '../../controllers/assiningbus.controllers.js/registerbus.controllers.js');
const assignbus = require('../../controllers/assiningbus.controllers.js/assigningbus.controller.js')
router.route('/registerbus').post(verifyJWT,rolecheck,busregisteringController);
router.route('/busassign').post(verifyJWT,rolecheck,assignbus);
router.route('/busdetails').post(verifyJWT,rolecheck,busdetails)
module.exports = router;