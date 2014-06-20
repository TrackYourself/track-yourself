/* jshint expr:true */
require('./../../../server.js');
var Sleep = require('./../../models/Sleep.js');
var mongoose = require('mongoose');
var expect = require('chai').expect;


describe('Creating a new sleep record', function() {

  var TEST_SLEEP = new Date(2014, 06, 09, 20, 03, 0);
  var TEST_WAKE = new Date(2014, 06, 10, 08, 32, 09);
  // mock user id
  var USER_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

  it('should require both sleep and wake', function(done) {
    Sleep.create({sleep: TEST_SLEEP}, function(err, sleep) {
      expect(err).to.exist;
      expect(sleep).to.not.exist;
      done();
    });
  });

  it('should be able to access properties (sleep, wake) after creation', function(done) {

    Sleep.create({sleep: TEST_SLEEP, wake: TEST_WAKE, user: USER_ID},
      function(err, sleep) {
        if (err) {
          console.log('Error creating sleep: ' + err);
          return;
        }
        expect(err).to.not.exist;
        expect(sleep.sleep).to.equal(TEST_SLEEP);
        expect(sleep.wake).to.equal(TEST_WAKE);
        done();
      }
    );
  });

  it('should be able to access methods (duration) after creation', function(done) {
    Sleep.create({sleep: TEST_SLEEP, wake: TEST_WAKE, user: USER_ID},
      function(err, sleep) {
        expect(err).to.not.exist;
        expect(sleep.duration).to.exist;
        done();
      }
    );
  });

});

