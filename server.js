var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
var nodeEnv = process.env.NODE_ENV || 'production';

app.set('port', process.env.PORT || 3000);

// middleware
app.use(bodyparser());

// connect to database
var dbLocations = {
  production: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
  development: 'mongodb://localhost/track-yourself',
  test: 'mongodb://localhost/track-yourself-test'
};

mongoose.connect(dbLocations[nodeEnv], function (err) {
  if (err) {
  console.log('ERROR connecting to: ' + dbLocations[nodeEnv] + '. ' + err);
  } else {
  console.log('Succeeded connecting to: ' + dbLocations[nodeEnv]);
  }
});

// initialize routing
require('./backend/routes/sleep-router.js')(app);

// start server
var server = app.listen(app.get('port'), function() {
  console.log('The server is running on ' + app.get('port'));
});

server.on('error', function() {
  console.log('Error; shutting down server.');
  server.close();
});

