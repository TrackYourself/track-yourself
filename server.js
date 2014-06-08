var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);

/* TODO connect to database */

// start server
var server = app.listen(app.get('port'), function() {
  console.log('The server is running on ' + app.get('port'));
});

server.on('error', function() {
  console.log('Error; shutting down server.');
  server.close();
});

