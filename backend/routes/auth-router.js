var User = require('./../../backend/models/User');

module.exports = function (app, passport) {

	/* Log in/out */

	app.post('/auth/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.send(401, info);
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.send(200, 'Login successful.');
      });
    })(req, res, next);
  });

	app.get('/logout', function (req, res) {
		req.logout();
		return res.send(200, 'Logged out.');
	});


	/* Register */

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
