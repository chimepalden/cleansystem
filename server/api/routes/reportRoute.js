// define all report api endpoints.
const express = require('express')
const router = express.Router()
// require the package jsonwebtoken
const jwt = require('jsonwebtoken')
// import schemas'
const Report = require('../models/reportModel');

// a.Toronto and East York b.Etobicoke York c.North York d.Scarborough

a = ['M4B','M4C','M4E','M4L','M4J','M4K','M4M','M4V','M4S','M4T','M4W','M4X','M4Y',
        'M5A','M5B','M5C','M5E','M5G','M5H','M5J','M5K','M5L','M5P','M5R','M5S','M5T',
            'M5V','M5X','M6C','M6E','M6G','M6H','M6J','M6K','M6P','M6R','M6S'];

b = ['M3J','M3L','M3N','M6L','M6M','M6N','M8V','M8W','M8Y','M8Z','M9A','M9B','M9C',
        'M9L','M9M','M9N','M9P','M9R','M9V','M9W'];

c = ['M2H','M2J','M2K','M2L','M2M','M2N','M2P','M2R','M3A','M3B','M3C','M3H','M3J',
        'M3K','M3L','M3M','M4A','M4G','M4H','M4N','M4P','M4R','M4S','M5M','M5N','M6A','M6B','M6N',];

d = ['M1B','M1C','M1E','M1G','M1H','M1J','M1K','M1L','M1M','M1N','M1P','M1R','M1S',
        'M1T','M1V','M1W','M1X']; 


postalCode = [a, b, c, d];

console.log(postalCode[3][0]);

// Post a Report
router.post('/', (req, res, next) =>{
    var newCommunityCouncilArea
    let newAddress = req.body.address.split(',');
    let postalCodePrefix = newAddress[2].substring(4,7);

    for(let i = 0; i < postalCode.length; i++){
        for(let j=0; j < postalCode[i].length; j++){
            if (postalCode[i][j] === postalCodePrefix) {
                if(i===0) {
                    newCommunityCouncilArea = "Downtown and East York";
                }else if(i === 1){
                    newCommunityCouncilArea = "Etobicoke York";
                }else if(i === 2){
                    newCommunityCouncilArea = "North York";
                }else if(i === 3){
                    newCommunityCouncilArea = "Scarborough";
                }
            }
        }
    }                      
    console.log(newCommunityCouncilArea);
    const report = new Report({
        problems: req.body.problems.filter((element, index, array) => {
            if (element !== null ) { 
                return element; // Displaying selected problem/problems only
            }
        }),    
        otherProblems: req.body.otherProblems,
        address: req.body.address,
        communityCouncilArea: newCommunityCouncilArea,
        date: req.body.date
    }); 
    // Saving in the db using promise
    report.save().then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));    
    res.status(200).json({
        message: "Handling post requests to report",
        createdReport: report
    });
});

// Get all the reports
router.get('/', (req, res, next) => {
    Report.find()
            .exec()
            .then(docs => {
                // console.log(docs);
                res.status(200).json(docs)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err 
                });
            });
})

// Get reports under a communityCouncilArea
router.get('/:communityCouncilArea', (req, res, next) => {
    if(req === 'Toronto') {
        Report.find()
            .exec()
            .then(docs => {
                // console.log(docs);
                res.status(200).json(docs)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err 
                });
            });
    } else {
            Report.find({communityCouncilArea: req.params.communityCouncilArea}, function(err, report){
                if(err) {
                    res.json(err);
                }else {
                    res.json(report); 
                }
            });
        }    

})

// Get a Report with id
router.get('/:reportId', (req, res, next) => {
    Report.find({_id: req.params.reportId}, function(err, report){
        if(err) {
            res.json(err);
        }else {
            res.json(report);
        }
            
    });
    /*if(id == 'special') {
        res.status(200).json({
            message: 'It is special Id',
            id: id
        });
        Report.find()
              .exec()
              .then(docs => {json(docs)});
    } else {
        res.status(200).json({
            message: 'you passed an Id',
            Id: id
        });
        Report.find()
              .exec()
              .then(docs => {json(docs)});
    }*/
})

module.exports = router