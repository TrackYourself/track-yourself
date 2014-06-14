var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../backend/models/User');

module.exports = function() {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
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

	/*
	Registration
	*/
	passport.use('local-signup', new LocalStrategy(
			strategySchema,
			function (req, email, password, done) {

				process.nextTick( function () {

					User.findOne({ 'local.email': email }, function (err, user) {

							if (err) {
								return done(err);
							}

							// check to see if there's already a user with that email
							if (user) {
								req.flash('signupMessage', 'That email is already taken.');
								return done(null, false);
							}

							var newUser = new User();

							newUser.role = 'user';
							newUser.name = req.body.userName;
							newUser.local.email = email;
							newUser.local.password = newUser.generateHash(password);

							newUser.save(function (err) {
								if (err) {
									throw err;
								}
								return done(null, newUser);
							});

					});
				});
			}
	));

	/*
	Login
	*/
	passport.use('local-login', new LocalStrategy(
			strategySchema,
			function (req, email, password, done) {

				User.findOne({ 'local.email': email}, function (err, user) {

					if (err) {
						return done(err);
					}

					if (!user || !user.validPassword(password)) {
						req.flash('loginMessage', 'Incorrect user or password');
						return done(null, false);
					}

					return done(null, user);

				});
			}
	));
};
