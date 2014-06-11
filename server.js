var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.set('port', process.env.PORT || 3000);

// connect to database
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/track-yourself';
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log('Succeeded connected to: ' + uristring);
  }
});

// start server
var server = app.listen(app.get('port'), function() {
  console.log('The server is running on ' + app.get('port'));
});

server.on('error', function() {
  console.log('Error; shutting down server.');
  server.close();
});

