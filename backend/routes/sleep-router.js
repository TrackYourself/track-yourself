var Sleep = require('./../models/Sleep.js');
var mongoose = require('mongoose');

module.exports = function(app) {

  /* Create a new sleep record for a user */
  app.post('/api/sleep', function(req, res) {
    var sleep = req.body.sleep;
    var wake = req.body.wake;
    if (!sleep || !wake) {
      return res.send(200, 'Incomplete input for sleep record.'); //TODO
    }
    Sleep.create({user: req.user._id, sleep: sleep, wake: wake}, function(err, sleep) {
      if (err) {
        return res.send(500, 'Error creating sleep record: ' + err);
      }
      return res.json(200, sleep.toJSON({virtuals: true}));
    });
  });

  /* Get all sleep records for a user */
  app.get('/api/sleep/all', function(req, res) {
    Sleep.find({user: req.user._id}, {}, {sort: {sleep: -1}}, function(err, sleeps) {
      if (err) {
        return res.send(500, 'Error finding sleep records.');
      }
      return res.json(200, sleeps);
    });
  });

  /* Get sleep info from last night
   * (searches for a wakeup time within last 24hrs)
   * Returns sleep obj as JSON, or false if none exists */
  app.get('/api/sleep',  function(req, res) {

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    Sleep.findOne({
        user: req.user._id,
        wake: { $gte: yesterday }
      },
      {}, // fields
      {
        sort: { wake: -1 }
      },
      function(err, sleep) {
        if (err) {
          return res.send(500, 'Error finding sleep record: ' + err);
        }
        if (sleep) {
          return res.send(200, sleep.toJSON({virtuals: true}));
        }
        return res.send(404);
    });
  });


};

