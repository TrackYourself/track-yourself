var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var	passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var expressHbs = require('express3-handlebars');

// Initialize & configure express app
var app = express();
app.set('port', process.env.PORT || 3000);
var nodeEnv = process.env.NODE_ENV || 'production';
process.env.PWD = process.cwd();

// Passport auth and JWT
// var jwtauth = require('./lib/jwyAuth.js')(app);
// app.set('jwtTokenSecret', process.env.JWT_SECRET || '95bf6e3620dce448f16d048f1d3854b7');

// Serve client-side code
app.use('/app', express.static(process.env.PWD + '/dist'));

// Log requests to the console
app.use(function (req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

// Server-side templating
app.engine('hbs', expressHbs({
	extname: 'hbs',
	defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

// Just use it
app.use(bodyparser());

// Authentication through Passport
require('./config/passport')(passport);
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET || 'a691865436aaca1b7c5a755a57ea68db',
	cookie: {
		maxAge: (60 * 60 * 24 * 7) // one week
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// connect to database
var dbLocations = {
  production: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/track-yourself',
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

// Initialize backend routing
require('./backend/router.js')(app, passport);
require('./backend/routes/sleep-router.js')(app);


// Start server
app.listen(app.get('port'), function() {
  console.log('The server is running on ' + app.get('port'));
})
.on('error', function() {
  console.log('ERROR: shutting down server.');
  this.close();
});

