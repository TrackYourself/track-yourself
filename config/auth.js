var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var	passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Authentication through Passport
module.exports = function(app) {
  require('./passport.js')();
	app.set('jwtTokenSecret', process.env.JWT_SECRET || 'c1a697399ca9ca37aef7ffbeb1d417e9');
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({
    secret: process.env.SECRET || 'a691865436aaca1b7c5a755a57ea68db',
		cookie: {
      maxAge: (60 * 60 * 24 * 7) // one week
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
};
