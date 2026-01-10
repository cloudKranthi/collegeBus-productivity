const express= require('express');
const router= express.Router();
const verifyJWT = require('../middleware/auth.middleware.js')
const busregisteringController= require('../controllers/assiningbus.controllers.js/registerbus.controllers.js')
router.route('/registerbus').post(verifyJWT,busregisteringController);
module.exports = router;