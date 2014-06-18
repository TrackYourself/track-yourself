/* Configure backend routing. Required by server.js */

var passport = require('passport');

module.exports = function (app) {

	// route middleware to make sure a user is logged in
	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

  // Entry point for angular app
  /*
  app.use('/app', function(req, res, next) {
    userIsLoggedIn(req, res, next); 
    express.static(process.env.PWD + '/dist');
  });
  app.get('/app', userIsLoggedIn, function(req, res, next) {
    console.log('in /app middleware!');
    res.sendfile('/dist/index.html');
  });
  */

	// Sleep
	require('./routes/sleep-router.js')(app, passport);

	// Auth
	require('./routes/auth-router.js')(app, passport);

};
