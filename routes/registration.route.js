const express = require('express');
const mongoose = require('mongoose');
const { Route } = require('react-router');
const registrationController = require('../controllers/registartion.controller')
const route = Route.express();
route.route('/register').post(registrationController)
module.exports= route;