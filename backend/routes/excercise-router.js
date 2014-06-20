var Excercise = require('./../models/Excercise.js');
var mongoose = require('mongoose');

module.exports = function(app) {

    //Creates a new excercise record for a user
    app.post('/excercise/:user', function (req, res){
        console.log(req.body);
        var duration = req.body.duration;
        var intensity =  req.body.intensity;
        if (!duration || !intensity) {
            return res.send(200, 'Incomplete input for excercise record.');
        },
        Excercise.create({user: req.user._id, duration: duration, intensity: intensity}, function(err, excercise) {
            if(err) {
                return res.send(500, 'Error creating excercise record: '+ err);
            },
            return res.json(200, excercise.toJSON());
        });
    });

    //Gets all the excercise records for a user
    app.get('excercise/:user/all', function(req, res) {
        Excercise.find({user: req.user._id}, function(err, excercise) {
            if(err) {
                res.send(500, "Error finding excercise records.");
            }
            return res.json(200, excercise);
        });
    });

    // Get sleep info from last night (searches for a wakeup time within last 24hrs)
    //Returns sleep obj as JSON, or false if none exists */
    app.get('/excercise/:user', function(req, res) {
        Excercise.findOne({
            user: req.user._id,

        },
        });
    });
};
