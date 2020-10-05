// require the mongoose installed
const mongoose = require('mongoose')
const validator = require('validator')

// instance of mongoose schema
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: Schema.Types.Mixed,
        required: true
    }
})
// user model created from userSchema
module.exports = mongoose.model('User', userSchema)