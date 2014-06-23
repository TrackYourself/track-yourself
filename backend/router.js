/* Configure backend routing. Required by server.js */

var passport = require('passport');
var express = require('express');

module.exports = function (app) {

	// Sleep
	require('./routes/sleep-router.js')(app, passport);

	// Water
	require('./routes/water-router.js')(app);

	// Auth
	require('./routes/auth-router.js')(app, passport);

	// Entry point for angular
  process.env.PWD = process.cwd() || __dirname;
  app.use(express.static(process.env.PWD + '/dist'));
};
