
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

	// Register page
	app.get('/register', function (req, res) {
		return res.render('register', {
			title: 'the register page',
			message: req.flash('signupMessage')
		});
	});
};

