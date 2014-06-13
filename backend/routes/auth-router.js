
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

	/*
	Login/out
	*/

	app.get('/login', function (req, res) {
		return res.render('login', {
			title: 'the login page',
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
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

};
