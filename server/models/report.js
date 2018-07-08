const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reportSchema = new Schema({
    problems: String,
    address: String,
    inputDate: Date,
   // status: Number
})
// report model for mongoose to manipulate problems in db
module.exports = mongoose.model('report', reportSchema, 'reports')