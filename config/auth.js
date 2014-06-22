var cookieParser = require('cookie-parser');
var	passport = require('passport');
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

	app.use('/api', function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.send(401);
  });

};
