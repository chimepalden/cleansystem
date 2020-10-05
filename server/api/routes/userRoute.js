// define all our api endpoints and all the db connection happens here.
const express = require('express')
const router = express.Router()
// require the package jsonwebtoken
const jwt = require('jsonwebtoken')
// import schemas'
const User = require('../models/userModel')

// Get all users.
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// get a user with Id
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findone(id, (err, user) => {
        if(err){
            console.log(err);
            return 'Cannot find the user with id: ' + id;
        } else {
            res.send(user);
        }
    });
})

// User delete
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne(id, (err, user) => {
        if(err){
            console.log(err);
            return 'User does not exists';
        } else {
            return 'User with id: ' + id + ' deleted!';
        }
    })
})

// User login 
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

// User registration
router.post('/register', (req, res)=> {
    let newUser = new User(req.body)
    newUser.save((error, registeredUser) => {
        if(error) {
            res.json(error);
            console.log(error);
        }else {
            res.json(registeredUser);
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
// exporting the router, goes to package.json file, finds main entry file, index.js and starts the server with index.js
module.exports = router

