const express = require('express');
const mongoose = require('mongoose');

const registrationController = require('../../controllers/auth.controllers.js/registartion.controller')
const route = express.Router();
route.route('/register').post(registrationController)
module.exports= route;