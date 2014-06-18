var cookieParser = require('cookie-parser');
var	passport = require('passport');
var flash = require('connect-flash');
var cookieSession = require('express-session');

// Authentication through Passport
module.exports = function(app) {
  require('./passport.js')(); //passport strategies
  app.use(cookieParser());
  app.use(cookieSession({
    secret: process.env.SECRET || 'a691865436aaca1b7c5a755a57ea68db',
		cookie: {
      maxAge: (60 * 60 * 24 * 7) // one week
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  
  // Middleware that checks whether user is authenticated
	app.use('/app', function (req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			return next();
		}
		// if they aren't redirect them to the home page
		//req.flash('loginMessage', 'You need to login to view that page.');
		res.redirect('/login');
	});

	app.use('/api', function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.send(401);
  });

};
