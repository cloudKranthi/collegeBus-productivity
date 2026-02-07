const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const registrationRoute = require('./routes/auth_routes/registration.route')
const loginRoute_andlogoutRoute = require('./routes/auth_routes/login_and logout.route')
const bus = require('./routes/bus_routes/bus.route')
const trip = require('./routes/bus_routes/trip.routes')
const UserDetails = require('./routes/auth_routes/userdetails.routes')
const errorHandler = require('./middleware/error.middleware');
const app = express();
const cors = require('cors')
app.use(express.json());
const PORT = process.env.PORT||5000||8800;

const connectDB = require('./utils/config/connectdb')

    connectDB()
    .then(()=>{
        app.use(cookieParser());
        app.use(cors({
            origin:'http://localhost:5173',
            credentials:true
        }))
    app.use('/',registrationRoute)
app.use('/',loginRoute_andlogoutRoute)
app.use((req,res,next)=>{
    const requestID=crypto.randomUUID();
    req.setHeader("requestId",requestID);
    next();
})
app.use('/bus',bus)
app.use('/trip',trip)
app.use('/userdetails',UserDetails)
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})
    })
.catch((error)=>{
    console.log(error)
})

