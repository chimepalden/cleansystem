const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const subscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)