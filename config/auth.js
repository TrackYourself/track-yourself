var cookieParser = require('cookie-parser');
var	passport = require('passport');
//var flash = require('req-flash');
var cookieSession = require('express-session');
var User = require('./../backend/models/User');

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
  //app.use(flash());
  
  /* Middleware that checks whether user is authenticated */
	/*app.use('/app', function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		//req.flash('loginMessage', 'You need to login to view that page.');
		res.redirect('/login');
	});
  */

	app.use('/api', function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.send(401);
  });

  /* Middleware for admin-only area of site */
	app.use('/admin', function(req, res, next) {

		if (!req.isAuthenticated()) {
      res.redirect('/login');
		}

		User.findOne({ '_id': req.session.passport.user }, function (err, user) {

			if (err) {
				return done(err);
			}

			// check to see if there's already a user with that email
			if (!user || !user.role || user.role !== 'admin') {
				return res.send(401, {'msg': 'Not authorized'});
			}
		});

  });

};
