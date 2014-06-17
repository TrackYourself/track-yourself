var User = require('../backend/models/User');
var jwt = require('jwt-simple');

module.exports = function (app) {

	return function (req, res, next) {

		console.log('JWT auth');

		// Get the token from the body of the request or from the headers
		var token = req.headers['x-access-token'];

		if (!token) {
			return res.send(401, {'msg': 'no access token found'});
		}

		try {
			var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
			User.findOne({'_id': decoded.iss}, function (err, user) {
				if (err) {
					return res.send(500, err);
				}
				if (!user) {
					return res.send(401, {'msg': 'No user found for that access token.'});
				}
				if (decoded.exp <= Date.now()) {
					return res.end('Access token has expired', 400);
				}
				req.user = user;
				return next();
			});
		} catch(err) {
			return res.send(500);
		}
	};

};