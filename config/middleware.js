var bodyparser = require('body-parser');
var express = require('express');

module.exports = function(app) {

  // Log requests to the console
  app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
  });

  // Parse body of json and urlencoded requests
  app.use(bodyparser());

  app.use('/app', express.static(process.env.PWD + 'dist/'));

};

