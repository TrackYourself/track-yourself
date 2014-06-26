/* jshint expr true */
require('./../../../server.js');
var superagent = require('superagent');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

var userId;

describe('User goals REST API', function () {
    var agent = superagent.agent();

    //Setup before tests begin
    before(function(done) {

        //remove all user entries from tests database
        var conn = mongoose.connection;
        conn.collections.users.drop();

        //create new user
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
            //save userId for use tests
            userId = mongoose.Types.ObjectId(user._id);
        });

        //Posting login info to db
        agent.post('localhost:3000/auth/login')
            .send({ email: 'test@gmail.com', password: 'pasty'})
            .end(function (err, res) {
                if(err) throw err;
                // signal that tests can start
                done();
        });
    });
});
