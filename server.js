var express = require('express');

// Initialize & configure express app
var app = express();

require('./config/config.js')(app);

require('./config/middleware.js')(app);

require('./config/auth.js')(app);

require('./config/db.js');

require('./backend/router.js')(app);

// Start server
app.listen(app.get('port'), function() {
  console.log('The server is running on ' + app.get('port'));
})
.on('error', function() {
  console.log('ERROR: shutting down server.');
  this.close();
});

