var User = require('./../../backend/models/User');

module.exports = function (app, passport) {

	/* Log in/out */

	app.route('/login')
		.get(function (req, res) {
			return res.render('login', {
				title: 'the login page',
				message: 'placeholder flash'// req.flash('loginMessage')
			});
		})
		.post(passport.authenticate('local-login', {
			successRedirect: '/app',
			failureRedirect: '/login',
			failureFlash   : true
		}));

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	/* Register */

	app.get('/register', function (req, res) {
		return res.render('register', {
			title: 'the register page',
			message: 'placeholder' //req.flash('signupMessage')
		});
	});

	// Process the register form
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect: '/app',
		failureRedirect: '/register',
		failureFlash   : true
	}));


	/*
	Profile

	app.get('/profile', userIsLoggedIn, function (req, res) {
		return res.render('profile', {
			title: 'your profile',
			user: req.user
		});
	});

  */

	app.get('admin/profile/:uid', function (req, res) {

		User.findOne({ '_id': req.param('uid') }, function (err, user) {

			if (err) {
				console.log(err);
				return done(err);
			}

			// Is there a user with that id?
			if (!user) {
				return res.send(404, {'msg': 'Profile not found'});
			}

			return res.render('profile', {
				title: user.name + '\'s profile',
				user : user
			});
		});
	});

};
