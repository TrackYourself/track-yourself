var bodyparser = require('body-parser');

module.exports = function(app) {

  // For auth-related middleware see config/auth.js

  // Log requests to the console
  if (process.env.NODE_ENV !== 'test') {
    app.use(function (req, res, next) {
      console.log('%s %s', req.method, req.url);
      next();
    });
  }

  // Parse body of json and urlencoded requests
  app.use(bodyparser());

};

