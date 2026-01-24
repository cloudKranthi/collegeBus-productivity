const express = require('express');
const router= express();
const  verifyJWT= require('../../middleware/auth.middleware.js');
const rolecheck = require('../../middleware/rolecheck.middleware.js')
const  busregisteringController = require( '../../controllers/assiningbus.controllers.js/registerbus.controllers.js');
router.route('/registerbus').post(verifyJWT,busregisteringController);
router.route('/busassign').post(verifyJWT,rolecheck,busregisteringController);
module.exports = router;