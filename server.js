const express = require('express');
const mongoose = require('mongoose');
const { Route } = require('react-router');
const registrationRoute = require('./routes/registration.route')
const loginRoute_andlogoutRoute = require('./routes/login_and logout.route')
const app = Route.express();
const PORT = process.env.PORT
app.use('/',registrationRoute)
app.use('/',loginRoute_andlogoutRoute)

const connectDB = require('./utils/config/connectdb')
app.use(connectDB);
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})