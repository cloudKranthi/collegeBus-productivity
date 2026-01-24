const express = require('express');
const mongoose = require('mongoose');

const registrationController = require('../../controllers/registartion.controller')
const route = express.Router();
route.route('/register').post(registrationController)
module.exports= route;