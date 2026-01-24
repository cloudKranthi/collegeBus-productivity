const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/logout.controllers')
const logincontroller=require('../../controllers/login.controllers')
const verifyJWT= require('../../middleware/auth.middleware')
router.route('/login').post(logincontroller);
router.route('/logout').post(logoutController);
module.exports = router;