var User = require('../../backend/models/User');

module.exports = function (app, passport) {

	// route middleware to make sure a user is logged in
	function userIsLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			return next();
		}

		// if they aren't redirect them to the home page
		req.flash('loginMessage', 'You need to login to view that page.');
		res.redirect('/login');
	}

	// Is this user capable of seeing admin pages?
	function userIsAdmin(req, res, next) {

		userIsLoggedIn(req, res, next);

		User.findOne({ '_id': req.session.passport.user }, function (err, user) {

			if (err) {
				return done(err);
			}

			// check to see if there's already a user with that email
			if (!user || !user.role || user.role !== 'admin') {
				console.log('UNAUTHORIZED REQUEST');
				res.redirect('/401');
			}

		});

	}

	/*
	Login/out
	*/

	app
		.route('/login')
		.get(function (req, res) {
			return res.render('login', {
				title: 'the login page',
				message: req.flash('loginMessage')
			});
		})
		.post(passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/login',
			failureFlash   : true
		}));

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	/*
	Register
	*/

	app.get('/register', function (req, res) {
		return res.render('register', {
			title: 'the register page',
			message: req.flash('signupMessage')
		});
	});

	// Process the register form
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/register',
		failureFlash   : true
	}));


	/*
	Profile
	*/

	app.get('/profile', userIsLoggedIn, function (req, res) {
		return res.render('profile', {
			title: 'your profile',
			user: req.user
		});
	});


	app.get('/profile/:uid', userIsAdmin, function (req, res) {

		User.findOne({ '_id': req.param('uid') }, function (err, user) {

			if (err) {
				console.log(err);
				return done(err);
			}

			// Is there a user with that id?
			if (!user) {
				res.redirect('/404');
			}

			return res.render('profile', {
				title: user.name + "'s profile",
				user : user
			});
		});
	});

};