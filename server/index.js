/* 
    Server, Middleware and db connection
    Importing modules 
*/
const express = require('express') 
const mongoose = require('mongoose')
// for parsing the incoming json data
const bodyParser = require('body-parser')
// middleware to navel server code and client side code
const cors = require('cors') 
// injecting port, env var offered by host providers else use port, 2000 
const port = process.env.PORT || 2000
// telling server to use this route; defining api route for the server.
const reportRoutes = require('./api/routes/reportRoute');
const userRoutes = require('./api/routes/userRoute');
const subscriberRoutes = require('./api/routes/subscriberRoute');
// creating instance of express, assigning express method to a variable/const
const app = express()
// adding middleware
app.use(cors())
// to handle json data
app.use(bodyParser.json())
// routes to handle requests
app.use('/report', reportRoutes)
app.use('/user', userRoutes)
app.use('/subscriber', subscriberRoutes)

// response to the preflight request if you inject 
// following headers the browser understands that it is ok to make further calls.
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });*/
  

// assigning specific port for server
app.listen(port, function() {
    console.log('server running on localhost:' + port)
})

// testing server, code to test get request with callback function.
app.get('/', function(req, res) {
    res.send('server is working!')
})

// db connection string
const db = "mongodb://chime:canada2014@ds245240.mlab.com:45240/cstorontodb"

// connecting to database
mongoose.connect(db, error => {
    if(error){
        console.log('Error in database connection!' + error)
    }else {
        console.log('Connected to mongodb, cstorontodb')
    }
})

// console.log(mongoose.connection.collections.reportRoutes.collectionName());