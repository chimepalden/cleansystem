// define all our api endpoints and all the db connection happens here.
const express = require('express')
const router = express.Router()
// require the package jsonwebtoken
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Report = require('../models/report')
const mongoose = require('mongoose')

// db connection string
const db = "mongodb://chime:canada2014@ds245240.mlab.com:45240/cstorontodb"

// connecting to database
mongoose.connect(db, error =>{
    if(error){
        console.log('Error!' + error)
    }else {
        console.log('Connected to mongodb, cstorontodb')
    }
})
// request with es6 syntax for testing.
router.get('/', (req, res) => {
    res.send('from api route')
})

// report api
router.post('/report', (req, res) =>{
    // extracting the reported data from req object
    let reportedData = req.body
    let data = Object.assign({}, reportedData, {
        problems: reportedData.problems.filter((element, index, array) => {
            if (element !== null ) { return element; }
        })
    })
    /*problems.filter( (element, index, array) => {
        if (element !== null){ return element;}
    })*/
    console.log(data)
    // converting the reported data into model that mongoose understands
    let report = new Report(data)
    // saving in the db
    report.save((error, registeredProblem)=>{
        if(error) {
            console.log(error)
        }else {
            res.status(200).send(registeredProblem);
            console.log(registeredProblem)
        }
    })
})

// registration api
router.post('/register', (req, res)=> {
    // extracting the user data from req object 
    let userData = req.body
    // converting the data into model that mongoose understands
    let user = new User(userData)
    // saving in the db
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        }else {
            // generating jsonwebtoken, 
            // create payload and assign key,subject to the id
            let payload = {subject: registeredUser._id}
            // jsonwebtoken is generated, stored in token variable
            let token = jwt.sign(payload, 'secretKey')
            // sending object, token after verifying using es6 syntax
            res.status(200).send({token})
            // res.status(200).send(registeredUser)
        }
    })    
})

// login api
router.post('/login', (req, res)=> {
    let userData = req.body
    // matching the input email with the email in the db
    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            // no user with input email
            if (!user) {
                res.status(401).send('Invalid email!')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password!')
            }else {
                // generating jsonwebtoken
                let payload = {subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                // sending object, token  after verifying
                res.status(200).send({token})
            //    res.status(200).send(user)
            }
        }
    })
})

// exporting the router.
module.exports = router

