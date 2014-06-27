var Exercise = require('./../models/Exercise.js');
var mongoose = require('mongoose');

module.exports = function(app) {

    //Creates a new exercise record for a user
    app.post('/api/exercise', function (req, res){
        var date = req.body.date;
        var duration = req.body.duration;
        var intensity =  req.body.intensity;
        if (!date || !duration || !intensity) {
            return res.send(200, 'Incomplete input for exercise record.');
        }
        Exercise.create({user: req.user._id, date: date, duration: duration, intensity: intensity, notes: req.body.notes},
          function(err, exercise) {
            if(err) {
                return res.send(500, 'Error creating exercise record: '+ err);
            }
            return res.json(200, exercise.toJSON());
        });
    });

	//Gets all the exercise records for a user
	app.get('/api/exercise/all', function(req, res) {
			Exercise.find({user: req.user._id}, function(err, exercise) {
					if(err) {
							res.send(500, "Error finding exercise records.");
					}
					return res.json(200, exercise);
			});
	});

	// Get exercise info from last night
	//Returns exercise obj as JSON, or false if none exists */
	app.get('/api/exercise', function(req, res) {
			Exercise.findOne({user: req.user._id},
			{},//only if you need certain fields
			{sort: { date: -1 }},
			function(err, exercise) {
					if (err) {
							return res.send(500, 'Error finding exercise record: ' + err);
					}
					if (exercise) {
							return res.send(200, exercise.toJSON());
					}
					return res.send(404);
			});
	});

	// Aggregate graph for exercise graph
	app.get('/api/exercise/graph', function (req, res) {

		var latest = new Date();
		var earliest = new Date(latest.getTime() - (14 * 24 * 60 * 60 * 1000));

		Exercise.aggregate(
				{
					$match: {
						user : req.user._id,
						date: {
							$gte: earliest,
							$lte: latest
						}
					}
				},
				{
					$group: {
						_id  : '$date',
						duration: {
							$sum: '$duration'
						},
						intensity: {
							$avg: '$intensity'
						}
					}
				},
				{
					$sort: {
						_id: 1
					}
				},
				function (err, exercises) {
					if (err) {
						return res.send(500, 'Error finding exercise records.');
					}
					return res.json(200, exercises);
				});
	});
};
