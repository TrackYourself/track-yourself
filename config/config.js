/* General/misc app configuration.
 * Required by server.js */

var expressHbs = require('express3-handlebars');

module.exports = function(app) {
  app.set('port', process.env.PORT || 3000);

  // Backend templating
//  app.engine('hbs', expressHbs({
//    extname: 'hbs',
//    defaultLayout: 'main.hbs'
//  }));
//  app.set('view engine', 'hbs');
	app.set('views', 'views');
	app.set('view engine', 'jade');
};

