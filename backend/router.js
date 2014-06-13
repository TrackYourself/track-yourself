
module.exports = function (app, passport) {
  require('./routes/sleep-router.js')(app);

	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

	// Login page
	app.get('/login', function (req, res) {
		return res.render('login', {
			title: 'the login page',
			message: req.flash('loginMessage')
		});
	});

	// process the login form
	app.post('/login', function (req, res) {

		passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/login',
			failureFlash   : true
		}, req, res);
	});

	// Register page
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

	// Profile page
	app.get('/profile', userIsLoggedIn, function (req, res) {
		return res.render('profile', {
			title: 'your profile',
			user: req.user
		});
	});

	// Logout
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};


// route middleware to make sure a user is logged in
function userIsLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		return next();
	}

	// if they aren't redirect them to the home page
	res.redirect('/');
}

