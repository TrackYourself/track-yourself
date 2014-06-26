var User = require('./../models/User.js');
var mongoose = require('mongoose');

module.exports = function(app) {

    //grabs goals for a specific user
    app.get('/api/goals', function (req, res) {
        User.findOne({_id: req.user._id},'goals', function (err, user) {
            if (err) {
                return res.send(500, "Error finding user's goals :" + err);
            }
            if (user.goals) {
                return res.send(200, user.goals.toJSON());
            }
            return res.send(404);
        });
    });

    app.post('/api/goals', function (req, res) {
        var waterPD = req.body.goals.waterPD;
        var exercisePD = req.body.goals.exercisePD;
        var sleepPD = req.body.goals.sleepPD;

        User.findByIdAndUpdate(req.user._id, {goals: {waterPD: waterPD, exercisePD: exercisePD, sleepPD: sleepPD}},
        function (err, user) {
            if (err) {
                return res.send(500, "Error inputting user goals :" + err);
            }
            if (user.goals) {
                return res.send(200, user.goals.toJSON());
            }
            return res.send(404);
        });
    });
};
