/* TODO this assumes we'll be getting a user id as string
 * - Update once User module is in place
 * - Better error handling (front-end should be validating, not sure how best to handle)
 */

var Water = require('./../models/Water.js');

module.exports = function(app) {

  /* Create a new sleep record for a user */
  app.post('/water/:user', function(req, res) {
    console.log(req.body);
    var intake = req.body.intake;
    if (!intake) {
      return res.send(200, 'Incomplete input for water record.'); //TODO
    }
    Water.create({user: req.param('user'), intake: intake}, function(err, water) {
      if (err) {
        return res.send(500, 'Error creating water record: ' + err);
      }
      return res.json(200, water.toJSON());
    });
  });

  /* Get all sleep records for a user */
  app.get('/water/:user/all', function(req, res) {
    Water.find({user: req.param('user')}, function(err, waters) {
      if (err) {
        return res.send(500, 'Error finding water records.');
      }
      return res.json(200, waters);
    });
  });

  /* Get sleep info from last night (searches for a wakeup time within last 24hrs)
   * Returns sleep obj as JSON, or false if none exists */
  app.get('/water/:user', function(req, res) {

    Water.findOne({
        user: req.param('user')
      },
      function(err, water) {
        if (err) {
          console.log(err);
          return res.send(500, 'Error finding water record: ' + err);
        }
        if (water) {
          return res.send(200, water.toJSON());
        }
        return res.send(404);
    });
  });


};

