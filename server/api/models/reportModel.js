
const mongoose = require('mongoose');

// defining schema
const reportSchema = mongoose.Schema({
        problems: {
            type: String,
            required: true
        },
        otherProblems: {
            type: String
        },
        address: {
            type: String,
            required: true
        },
        communityCouncilArea: {
            type: String
        },
        date: {
            type: Date, 
            default: Date.now
        }
        // divisionId: String
        // status: Number
        // sender's email or id for reliability
        // picture if availble
    });

module.exports = mongoose.model('Report', reportSchema);