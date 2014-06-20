/* jshint expr:true */
require('./../../../server.js');
var superagent = require('superagent');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var Sleep = require('./../../models/Sleep.js');
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

var userId;

describe('Sleep REST API', function() {

  var agent = superagent.agent();

  /* set up before we start tests */
  before(function(done) {

    // remove users and sleep records from db
    var conn = require('mongoose').connection
    conn.collections.sleeps.drop();
    conn.collections.users.drop();

    // create new user
    User.create({
      name: 'Tester',
      role: 'testbot',
      local: {
        email: 'test@gmail.com',
        // TODO use shared func (copied this from auth schema)
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
        // signal that tests can start
        done();
      });
  });

  it('should be able to create a new sleep record', function(done) {
    var sleepInput = {sleep: new Date(), wake: new Date()};
    agent.post('localhost:3000/api/sleep')
      .send(sleepInput)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.sleep).to.equal(sleepInput.sleep.toISOString());
        done();
      });
  });

  describe('using existing sleep records', function() {

    before(function(done) {
      // reset the sleeps db
      require('mongoose').connection.collections.sleeps.drop();

      // create sleep records to use in tests
      var today = new Date();
      var dt = {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
        hour: 14, minute: 32,
        seconds: 54
      };
      var jsdt;
      for (var i = 0; i < 5; i++) {
        jsdt = new Date(dt.year, dt.month, dt.day - i,
                        dt.hour, dt.minute, dt.seconds);
        Sleep.create({ wake: jsdt, sleep: jsdt, user: userId },
          function(err, sleep) {
            if (err) throw err;
          }
        );
      }
      done();
    });

    it('should be able to get all sleep records for a user', function(done) {
      agent.get('localhost:3000/api/sleep/all')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length.gt(1);
          expect(res.body[0]).to.have.property('sleep');
          expect(res.body[0]).to.have.property('wake');
          done();
        });
    });

    it('should be able to get sleep record from last night', function(done) {
      agent.get('localhost:3000/api/sleep')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('sleep');
          var sleep = new Date(res.body.sleep);
          var today = new Date();
          today = today.getDate();
          expect(sleep.getDate()).to.equal(today);
          done();
        });
    });

  });

});
