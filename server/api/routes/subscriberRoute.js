const express = require('express')
const router = express.Router()

const Subscriber = require('../models/subscriberModel');

router.post('/register', (req, res) => {
    let newSubscriber = new Subscriber(req.body);
    newSubscriber.save((error, subscribedUser) => {
        if(error) {
            console.log(error);
            res.status(500).json(error);
        } else if (subscribedUser) {
            console.log(subscribedUser);
            res.status(200).json({
                message: "Subscribed a user successfully",
                subscribedUser: {
                    email: subscribedUser.email,
                    _id: subscribedUser._id
                }
            });
        } else {
            res.status(500).json({
                message: "Unknown internal error!"
            })
        }
    });
})

module.exports = router