/* Configuration and connection to mongo db with mongoose
 * Required in server.js which initializes connection */

var mongoose = require('mongoose');
var nodeEnv = process.env.NODE_ENV || 'production';

// Set DB uri depending on NODE_ENV
var dbLocations = {
  production: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/track-yourself',
  development: 'mongodb://localhost/track-yourself',
  test: 'mongodb://localhost/track-yourself-test'
};

// Connect when this file is required
module.exports = mongoose.connect(dbLocations[nodeEnv], function (err) {
  if (err) {
    console.log('ERROR connecting to: ' + dbLocations[nodeEnv] + '. ' + err);
  } else {
    console.log('Succeeded connecting to: ' + dbLocations[nodeEnv]);
  }
});


