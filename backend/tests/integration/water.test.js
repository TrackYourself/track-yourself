/* jshint expr:true */
require('./../../../server.js');
var superagent = require('superagent');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var Water = require('./../../models/Water.js');
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

var userId;

describe('Water REST API', function() {

  var agent = superagent.agent();

  /* set up before we start tests */
  before(function(done) {

    // remove users and water records from db
    var conn = require('mongoose').connection;
    conn.collections.waters.drop();
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
    agent.post('localhost:3000/auth/login')
      .send({email: 'test@gmail.com', password: 'pasty'})
      .end(function(err, res) {
        if (err) throw err;
        // signal that tests can start
        done();
      });
  });

  it('should be able to create a new water record', function(done) {
    var waterInput = {drank: new Date(), intake: 11};
    agent.post('localhost:3000/api/water')
      .send(waterInput)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.drank).to.equal(waterInput.drank.toISOString());
        done();
      });
  });

  describe('using existing water records', function() {

    before(function(done) {
      // reset the waters db
      require('mongoose').connection.collections.waters.drop();

      // create water records to use in tests
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
        Water.create({ drank: jsdt, intake: i + 5, user: userId },
          function(err, water) {
            if (err) throw err;
          }
        );
      }
      done();
    });

    it('should be able to get all water records for a user', function(done) {
      agent.get('localhost:3000/api/water/all')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length.gt(1);
          expect(res.body[0]).to.have.property('intake');
          expect(res.body[0]).to.have.property('drank');
          done();
        });
    });

    it('should be able to get the last water record', function(done) {
      agent.get('localhost:3000/api/water')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('drank');
          var water = new Date(res.body.drank);
          var today = new Date();
          expect(water.getDate()).to.equal(today.getDate());
          done();
        });
    });

  });

});
