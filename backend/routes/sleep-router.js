/* TODO this assumes we'll be getting a user id as string
 * - Update once User module is in place
 * - Better error handling (front-end should be validating, not sure how best to handle)
 */

var Sleep = require('./../models/Sleep.js');

module.exports = function(app) {

  /* Create a new sleep record for a user */
  app.post('/sleep/:user', function(req, res) {
    console.log(req.body);
    var sleep = req.body.sleep;
    var wake = req.body.wake;
    if (!sleep || !wake) {
      return res.send(500, 'Incomplete input for sleep record.');
    }      
    Sleep.create({user: req.param('user'), sleep: sleep, wake: wake}, function(err, sleep) {
      if (err) {
        return res.send(500, 'Error creating sleep record.');
      }
      return res.json(200, sleep.toJSON({virtuals: true}));
    });
  });

  /* Get all sleep records for a user */
  app.get('/sleep/:user/all', function(req, res) {
    Sleep.find({user: req.param('user')}, function(err, sleeps) {
      if (err) {
        return res.send(500, 'Error finding sleep records.');
      }
      return res.json(200, sleeps);
    });
  });

  /* Get sleep info from last night (searches for a wakeup time within last 24hrs)
   * Returns sleep obj as JSON, or false if none exists */
  app.get('/sleep/:user', function(req, res) {
    var now = new Date();
    now.setDate(now.getDate() - 1);
    Sleep.findOne({user: req.param('user'), wake: {$gte: now}}, function(err, sleep) {
      if (err) {
        return res.send(404, 'Sleep record not found.');
      }
      return res.send(200, sleep.toJSON({virtuals: true}));
    });
  });

};

