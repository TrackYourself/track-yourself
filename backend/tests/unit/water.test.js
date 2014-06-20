/* jshint expr:true */
require('./../../../server.js');
var Water = require('./../../models/Water.js');
var mongoose = require('mongoose');
var expect = require('chai').expect;


describe('Creating a new water record', function() {

  var TEST_DRANK = new Date(2014, 06, 09, 20, 03, 0);
  var TEST_INTAKE = 20;
  // mock user id
  var USER_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

  it('should require intake', function(done) {
    Water.create({drank: TEST_DRANK}, function(err, water) {
      expect(err).to.exist;
      expect(water).to.not.exist;
      done();
    });
  });

  it('should require drank', function(done) {
    Water.create({intake: TEST_INTAKE}, function(err, water) {
      expect(err).to.exist;
      expect(water).to.not.exist;
      done();
    });
  });

  it('should be able to access properties (drank, intake) after creation', function(done) {

    Water.create({drank: TEST_DRANK, intake: TEST_INTAKE, user: USER_ID},
      function(err, water) {
        if (err) {
          console.log('Error creating water: ' + err);
          return;
        }
        expect(err).to.not.exist;
        expect(water.drank).to.equal(TEST_DRANK);
        expect(water.intake).to.equal(TEST_INTAKE);
        done();
      }
    );
  });

});

