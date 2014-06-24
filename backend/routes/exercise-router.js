var Exercise = require('./../models/Exercise.js');
var mongoose = require('mongoose');

module.exports = function(app) {

    //Creates a new exercise record for a user
    app.post('/exercise/:user', function (req, res){
        console.log(req.body);
        var date = req.body.date;
        var duration = req.body.duration;
        var intensity =  req.body.intensity;
        if (!date || !duration || !intensity) {
            return res.send(200, 'Incomplete input for exercise record.');
        },
        Exercise.create({user: req.user._id, date: date, duration: duration, intensity: intensity}, function(err, exercise) {
            if(err) {
                return res.send(500, 'Error creating exercise record: '+ err);
            },
            return res.json(200, exercise.toJSON());
        });
    });

    //Gets all the exercise records for a user
    app.get('exercise/:user/all', function(req, res) {
        Exercise.find({user: req.user._id}, function(err, exercise) {
            if(err) {
                res.send(500, "Error finding exercise records.");
            }
            return res.json(200, exercise);
        });
    });

    // Get exercise info from last night 
    //Returns exercise obj as JSON, or false if none exists */
    app.get('/exercise/:user', function(req, res) {
        Exercise.findOne({
            user: req.user._id,
            sort: { date: -1 }
        }, function(err, exercise) {
            if (err) {
                return res.send(500, 'Error finding exercise record: ' + err);
            }
            if (exercise) {
                return res.send(200, exercise.toJSON();
            }
            return res.send(404);
        });
    });
};
