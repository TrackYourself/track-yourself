/* globals module */

module.exports = function (app, passport) {

	/*
	Front-end routes
	*/

	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

	// Login page
	app.get('/login', function (req, res) {
		return res.render('login', {
			title: 'the login page'
		});
	});

	// Homepage
	app.get('/register', function (req, res) {
		return res.render('register', {
			title: 'the login page'
		});
	});
};

