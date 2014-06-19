/* Configure backend routing. Required by server.js */

var passport = require('passport');
var jwtauth = require('../config/jwtAuth');

module.exports = function (app) {

	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

	// Sleep
	require('./routes/sleep-router.js')(app);

	// Water
	require('./routes/water-router.js')(app);

	// Auth
	require('./routes/auth-router.js')(app, passport, jwtauth(app));

};
