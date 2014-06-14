/* Configure backend routing. Required by server.js */

var passport = require('passport');

module.exports = function (app) {

	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

	// Sleep
	require('./routes/sleep-router.js')(app);

	// Auth
	require('./routes/auth-router.js')(app, passport);

};
