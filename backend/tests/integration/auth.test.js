/* jshint expr:true */
require('./../../../server.js');
var expect = require('chai').expect;
var superagent = require('superagent');
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

describe('Authorization', function() {

  var agent = superagent.agent();

  describe('when not logged in', function() {

    describe(' - accessing public pages', function() {

      it('should be able to access home page', function(done) {
        agent.get('localhost:3000/').end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.res.url).to.equal('');
          done();
        });
      });

    });

    describe(' - trying to access private pages', function() {

      it('should return 401 when trying to access an API path', function(done) {
        superagent.get('localhost:3000/api/sleep').end(function(err, res) {
          expect(res.status).to.equal(401);
          done();
        });
      });

    });


    describe(' - registering and logging in', function() {

      beforeEach(function(done) {
        agent.get('localhost:3000/logout').end(function() {
          require('mongoose').connection.collections.users.drop(function(err) {
            done();
          });
        });
      });

      it('should be able to register and be logged in automatically', function(done) {
        agent.post('localhost:3000/auth/register')
          .send({userName: 'Tester', email: 'test@gmail.com', password: 'pasty'})
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Registration successful.');
            done();
          });
      });

      it('should be able to log in', function(done) {
        User.create({
          name: 'Tester',
          role: 'testbot',
          local: {
            email: 'testayay@gmail.com',
            // TODO use shared func (copied this from auth schema)
            password: bcrypt.hashSync('PASSWORD', bcrypt.genSaltSync(8), null)
          }
        }, function(err) {
          if (err) throw err;
          agent.post('localhost:3000/auth/login')
            .send({email: 'testayay@gmail.com', password: 'PASSWORD'})
            .end(function(err, res) {
              if (err) throw err;
              expect(res.status).to.equal(200);
              expect(res.text).to.equal('Login successful.');
              done();
          });
        });
      });

    });
  });

});

