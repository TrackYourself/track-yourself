var Sleep = require('./../models/Sleep.js');
var expect = require('chai').expect;

var TEST_SLEEP = new Date(2014, 06, 09, 20, 03, 0);
var TEST_WAKE = new Date(2014, 06, 10, 08, 32, 09);

describe('creating a new sleep record', function() {

  it('should require both sleep and wake', function(done) {
    Sleep.create({sleep: TEST_SLEEP}, function(err, sleep) {
      expect(err).to.exist;
      expect(sleep).to.not.exist;
      done();
    });
  });

  it('should be able to access properties (sleep, wake) after creation', function(done) {

    Sleep.create({sleep: TEST_SLEEP, wake: TEST_WAKE}, function(err, sleep) {
      expect(err).to.not.exist;
      expect(sleep.sleep).to.equal(TEST_SLEEP);
      expect(sleep.wake).to.equal(TEST_WAKE);
      done();
    });
  });

  it('should be able to access methods (duration) after creation', function(done) {
    Sleep.create({sleep: TEST_SLEEP, wake: TEST_WAKE}, function(err, sleep) {
      expect(err).to.not.exist;
      expect(sleep.duration).to.exist;
      done();
    });
  });

});

