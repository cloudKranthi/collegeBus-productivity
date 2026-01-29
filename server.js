const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const registrationRoute = require('./routes/auth_routes/registration.route')
const loginRoute_andlogoutRoute = require('./routes/auth_routes/login_and logout.route')
const bus = require('./routes/bus_routes/busregistration.route')
const trip = require('./routes/bus_routes/trip.routes')
const UserDetails = require('./routes/auth_routes/userdetails.routes')
const app = express();
app.use(express.json());
const PORT = process.env.PORT||5000||8800;

const connectDB = require('./utils/config/connectdb')

    connectDB()
    .then(()=>{
        app.use(cookieParser());
    app.use('/',registrationRoute)
app.use('/',loginRoute_andlogoutRoute)
app.use('/bus',bus)
app.use('/trip',trip)
app.use('/userdetails',UserDetails)
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})
    })
.catch((error)=>{
    console.log(error)
})

