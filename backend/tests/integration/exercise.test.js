/* jshint expr:true */
require('./../../../server.js');
var superagent = require('superagent');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var Exercise = require('./../../models/Exercise.js');
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

var userId;

describe('Exercise REST API', function() {

    var agent = superagent.agent();

    //Setup before tests start
    before(function(done) {

        //remove users and exercise records from db
        var conn = require('mongoose').connection;
        conn.collections.exercises.drop();
        conn.collections.users.drop();

        //create a new user
        User.create({
            name: 'Tester',
            role: 'testbot',
            local: {
                email: 'test@gmail.com',
                // TODO use shared func (copied this from auth schema)
                password: bcrypt.hashSync('pasty', bcrypt.genSaltSync(8), null)
            }
        }, function (err, user) {
            if (err) throw err;
            // save userId for use in tests
            userId = mongoose.Types.ObjectId(user._id);
        });

        //Posting login info to db
        agent.post('localhost:/3000/auth/login')
            .send({ email: 'test@gmail.com', password: 'pasty' })
            .end(function (err) {
                if (err) throw err;
                // signal that tests can start
                done();
        });
    });

    it('should be able to create a new exercise record', function (done) {

        var exerciseInput = {date: new Date(), duration: 30, intensity: 4};

        agent.post('localhost:/3000/api/exercise')
        .send(exerciseInput)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.body.date).to.equal(exerciseInput.date.toISOString());
            done();
        });
    });

    describe('using existing exercise records', function() {

        before(function (done) {
            //resets the exercises db
            require('mongoose').connection.collections.exercises.drop();

            //create exercise record to use in tests
            var today = new Date();
            var testDate = {
                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate(),
                hour: 15, minute: 45, seconds: 0
            };
            var jsTestDate;
            for (var i = 1; i <= 5; i++) {
                jsTestDate = new Date(testDate.year, testDate.month, testDate.day - i, testDate.hour, testDate.minute, testDate.seconds);
                Exercise.create({ date: jsTestDate, intensity: i, duration: (10 * i), user: userId },
                function() {
                    if (err) throw err;
                });
            }
            done();
        });

        it('should be able to get all the exercise records for a user', function(done) {
            agent.get('localhost:/3000/api/exercise/all')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body[0]).to.have.property('duration');
                expect(res.body[0]).to.have.property('intensity');
                expect(res.body[0]).to.have.property('date');
                done();
            });
        });

        it('should be able to grab the exercise record from last night', function (done) {
            agent.get('localhost:3000/api/exercise')
            .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('date');
            var exercise = new Date(res.body.date);
            var today = new Date();
            expect(exercise.getDate()).to.equal(today.getDate());
            done();
            });
        });

    });
});
