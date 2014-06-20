/* Configure backend routing. Required by server.js */

var passport = require('passport');
var express = require('express');

module.exports = function (app) {

	// Homepage
	app.get('/', function (req, res) {
		return res.render('home', {
			title: 'the home page'
		});
	});

	// Sleep
	require('./routes/sleep-router.js')(app, passport);

	// Water
	require('./routes/water-router.js')(app);

	// Auth
	require('./routes/auth-router.js')(app, passport);

  // Static files
  // (Technically middleware, but route-related and need to load
  // after other middleware)
  process.env.PWD = process.cwd() || __dirname;
  app.use('/app', express.static(process.env.PWD + '/dist/'));
  
};