var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../backend/models/User');

module.exports = function() {

  /* Serialization used for sessions */
	passport.serializeUser(function (user, done) {
		done(null, user.id); // only serialize user id
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	var strategySchema = {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	};

	/* Registration strategy */
	passport.use('local-signup', new LocalStrategy(strategySchema,
			function (req, email, password, done) {

        // check to see if there's already a user with that email
        User.findOne({ 'local.email': email }, function (err, user) {

            if (err) {
              console.log(err);
              return done(err);
            }

            if (user) {
              return done(null, false, {message: 'That email is already registered.'});
            }

            // create new User
            var newUser = new User();
            newUser.role = 'user';
            newUser.name = req.body.name;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save User, log in
            newUser.save(function (err) {

              if (err) return done(err);

              // successful registration; try to log in
              req.login(newUser, function(err) {
                if(err) {
                  return done(err, newUser);
                }
                return done(null, newUser); //successful login
              });
            });

        });
      }
	));

  /* Login strategy */
  passport.use('local-login', new LocalStrategy(strategySchema,
    function (req, email, password, done) {
      User.findOne({ 'local.email': email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
        return done(null, user);
      });
    }
  ));
};

