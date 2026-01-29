const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/auth.controllers.js/logout.controllers')
const logincontroller=require('../../controllers/auth.controllers.js/login.controllers');
const refreshController = require('../../controllers/auth.controllers.js/refresh.controller')
const verifyJWT= require('../../middleware/auth.middleware')
router.route('/login').post(logincontroller);
router.route('/logout').post(logoutController);
router.route('/refresh').post(refreshController);
module.exports = router;