/* 
 * - Update once User module is in place
 * - Better error handling (front-end should be validating, not sure how best to handle)
 */

var Water = require('./../models/Water.js');

module.exports = function(app) {

  /* Create a new water record for a user */
  app.post('/api/water', function(req, res) {
    var intake = req.body.intake;
    var drank = req.body.drank;
    if (!intake || !drank) {
      return res.send(200, 'Incomplete input for water record.'); //TODO
    }
    Water.create({user: req.user._id, intake: intake, drank: drank}, function(err, water) {
			if (err) {
				return res.send(500, 'Error creating water record: ' + err);
			}
			return res.json(200, water.toJSON());
		});
  });

  /* Get last 20 water records for a user */
  app.get('/api/water/all', function(req, res) {
    Water.find(
			{user: req.user._id},
			{drank: 1, intake: 1},
			{limit: 20,	sort: {drank: -1}},
			function (err, waters) {
				if (err) {
					return res.send(500, 'Error finding water records.');
				}
				return res.json(200, waters);
			});
  });

  /* Get aggregated results for the last 2 weeks */
  app.get('/api/water/graph', function(req, res) {
    Water.find(
			{
				user: req.user._id,
				date: new Date()
			},
			{
				drank: 1,
				intake: 1
			},
			{
				limit: 20,
				sort: {
					drank: -1
				}
			},
			function (err, waters) {
				if (err) {
					return res.send(500, 'Error finding water records.');
				}
				return res.json(200, waters);
			});
  });

	/*
	Get the last water record ... not particularly helpful

  app.get('/api/water', function(req, res) {

    Water.findOne({user: req.user._id},
      function(err, water) {
        if (err) {
          console.log(err);
          return res.send(500, 'Error finding water record: ' + err);
        }
				return res.json(200, water);
    });
  });

	*/

};

