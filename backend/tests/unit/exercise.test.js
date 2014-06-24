/* jshint expr:true */
require('./../../../server.js');
var Exercise = require('./../../models/Exercise.js');
var mongoose = require('mongoose');
var expect = require('chai').expect;

describe('Creating a new Exercise record', function() {

    var TEST_DATE = new Date(2014, 06, 23, 08, 45, 0);
    var TEST_DURATION = 30;
    var TEST_INTENSITY = 4;
    var TEST_USER_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000004');

    //??What does that done stand for?
    it('should require duration', function(done) {
        Exercise.create({ intensity: TEST_INTENSITY }, function (err, exercise) {
            expect(err).to.exist;
            expect(exercise).to.not.exist;
            done();
        });
    });

    it('should require intensity', function(done) {
        Exercise.create({ duration: TEST_DURATION } , function (err, exercise) {
            expect(err).to.exist;
            expect(exercise).to.not.exist;
            done();
        });
    });

    it('should be able to access properties (duration, intensity) after creation', function(done) {
        Exercise.create({ duration: TEST_DURATION, intensity: TEST_INTENSITY, user: TEST_USER_ID})
    });
});
