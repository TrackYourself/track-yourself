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

	/* Process the register form.
   * If successful, log in.
   */
	app.post('/auth/register', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.send(401, info);
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.send(200, 'Registration successful.');
      });
    })(req, res, next);
  });

};
