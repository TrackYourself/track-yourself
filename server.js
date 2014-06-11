/* globals require, console, process */

var
	// Express server
	express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),

	// DB
	mongoose = require('mongoose'),

	// Authentication
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),

	// Server-side templates
	expressHbs = require('express3-handlebars');

// Fun starts here
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/dist'));

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


// Secrets for password and token hashing
app.set('secret', process.env.SECRET || 'a691865436aaca1b7c5a755a57ea68db');
app.set('jwtTokenSecret', process.env.JWT_SECRET || '95bf6e3620dce448f16d048f1d3854b7');

// Read cookies for authentication
// WTF: line below causes app to hang
// app.use(cookieParser);

// Parse POST requests to JSON
app.use(bodyParser.json());

// Authentication through Passport
//app.use(session({ secret: app.get('secret') })); // session secret
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash);

// connect to database
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/track-yourself';
mongoose.connect(uristring, function (err, res) {
  if (err) {
		console.log('ERROR connecting to: ' + uristring + '. \n' + err);
  } else {
		console.log('SUCCESS connecting to: ' + uristring);
  }
});

// Passport auth and JWT
// var jwtauth = require('./lib/jwyAuth.js')(app);
// require('./config/passport')(passport);

require('./backend/router.js')(app, passport);

// Let's get this party started
app
	.listen(app.get('port'), function() {
		console.log('The server is running on ' + app.get('port'));
	})
	.on('error', function() {
		console.log('ERROR: shutting down server...');
		this.close();
	});

