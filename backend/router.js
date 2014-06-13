module.exports = function (app, passport) {

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
