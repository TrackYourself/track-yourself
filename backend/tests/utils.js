/* Functions that can be re-used in tests */

var bcrypt = require('bcrypt-nodejs');
var User = require('./../models/User.js');

/* Create a new User and log them in. Use in before/beforeEach
 * agent: the superagent.agent() that you'll use in test.
 * done: done function to indicate that before is complete */

module.exports.createUserAndLogin = function(agent) {

  // create new user
  User.create({
    name: 'Tester',
    role: 'testbot',
    local: {
      email: 'test@gmail.com',
      password: bcrypt.hashSync('pasty', bcrypt.genSaltSync(8), null)
    }
  }, function(err, user) {
    if (err) throw err;
    // save userId for use in tests
    userId = mongoose.Types.ObjectId(user._id);
  });

  // log in
  agent.post('localhost:3000/login')
    .send({email: 'test@gmail.com', password: 'pasty'})
    .end(function(err, res) {
      if (err) throw err;
  });
};

