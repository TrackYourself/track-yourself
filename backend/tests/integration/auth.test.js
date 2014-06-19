/* jshint expr:true */
require('./../../../server.js');
var expect = require('chai').expect;
var superagent = require('superagent');
var User = require('./../../models/User.js');
var bcrypt = require('bcrypt-nodejs');

describe('Authorization', function() {
  
  var agent = superagent.agent();

  before(function(done) {
    require('mongoose').connection.collections.users.drop();
    done();
  });

  describe('when not logged in', function() {
  
    beforeEach(function(done) {
      agent.get('localhost:3000/logout').end(function() {
        done();
      });
      require('mongoose').connection.collections.users.drop();
    });

    it('should be able to access home page', function() {
      agent.get('localhost:3000/').end(function(err, res) {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        expect(res.res.url).to.equal('');
      });
    });

    it('should be able to register and be logged in automatically', function() {
      agent.post('localhost:3000/register')
        .send({userName: 'Tester', email: 'test@gmail.com', password: 'pasty'})
        .end(function(err, res) {
          console.log('tried to register. ');
          console.log(res.body);
          expect(err).to.not.exist;
          expect([200, 304]).to.include(res.status); 
          expect(res.req.path).to.equal('/app/');
        });
    });

    // this tests breaks other tests
    xit('should be able to log in', function() {
      User.create({
        name: 'Tester',
        role: 'testbot',
        local: {
          email: 'testayay@gmail.com',
          // TODO use shared func (copied this from auth schema)
          password: bcrypt.hashSync('PASSWORD', bcrypt.genSaltSync(8), null)
        }
      }, function(err, user) {
        if (err) throw err;
        console.log(user);
        agent.post('localhost:3000/login')
          .send({email: 'testayay@gmail.com', password: 'PASSWORD'})
          .end(function(err, res) {
            if (err) throw err;
            expect([200, 304]).to.include(res.status); 
            console.log('trying to login ' + res.redirects);
            expect(res.redirects[res.redirects.length -1]).to.equal('http://localhost:3000/app');
        });
      });
    });
    
    xit('PENDING should access public static files without auth', function() {
      
    });
    
    it('should get redirected to /login when trying to access /app', function() {
      agent.get('localhost:3000/app/').end(function(err, res) {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        //console.log(res.redirects);
        expect(res.redirects[res.redirects.length -1]).to.equal('http://localhost:3000/login');
      });
      
    });
    
    it('should return 401 when trying to access an API path', function() {
      superagent.get('localhost:3000/api/sleep').end(function(err, res) {
        expect(res.status).to.equal(401);        
      });
    });
    

    xit('PENDING should be able to access home, login, register without auth', function() {
      
    });
  });
  
  xdescribe('PENDING when logged in', function() {
  
  });
  
});

