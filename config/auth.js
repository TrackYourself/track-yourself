var cookieParser = require('cookie-parser');
var	passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Authentication through Passport
module.exports = function(app) {
  require('./passport.js')();
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
};

// Passport auth and JWT
// var jwtauth = require('./lib/jwyAuth.js')(app);
// app.set('jwtTokenSecret', process.env.JWT_SECRET || '95bf6e3620dce448f16d048f1d3854b7');


