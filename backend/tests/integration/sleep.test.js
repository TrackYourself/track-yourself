var superagent = require('superagent');
var expect = require('chai').expect;
require('./../../../server.js');
var Sleep = require('./../../models/Sleep.js');

describe('using sleep rest api', function() {

  it('should be able to create a new sleep record', function(done) {
    var sleepInput = {sleep: new Date(), wake: new Date()};
    superagent.post('localhost:3000/sleep/testuser')
      .send(sleepInput)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.sleep).to.equal(sleepInput.sleep.toISOString());
        done();
      });
  });

  describe('with existing sleep records', function() {

    before(function() {
      require('mongoose').connection.collections.sleeps.drop();
      // create sleep records
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
        jsdt = new Date(dt.year, dt.month, dt.day - i, dt.hour, dt.minute, dt.seconds);
        Sleep.create({wake: jsdt, sleep: jsdt, user: 'testuser'});
      }
    });

    it('should be able to get all sleep records for a user', function(done) {
      superagent.get('localhost:3000/sleep/testuser/all')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length.gt(1);
          expect(res.body[0]).to.have.property('sleep');
          expect(res.body[0]).to.have.property('wake');
          done();
        });
    });

    it('should be able to get sleep record from last night', function(done) {
      superagent.get('localhost:3000/sleep/testuser')
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
