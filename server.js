const express = require('express');
const mongoose = require('mongoose');
const { Route } = require('react-router');
const registrationRoute = require('./routes/registration.route')
const app = Route.express();
const PORT = process.env.PORT
app.use('/',registrationRoute)
const connectDB= require('./utils/config/connectDB')
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})