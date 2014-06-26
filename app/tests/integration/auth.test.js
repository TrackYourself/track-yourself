/* jshint expr:true */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Auth interceptor', function() {

  describe('while not logged in', function() {
    var ptor;

    before(function() {
      ptor = protractor.getInstance();
    });

    it('/ should redirect to /#home', function() {
      browser.get('http://localhost:3000')
      expect(ptor.getCurrentUrl()).to.eventually.equal('http://localhost:3000/#/home');
    });

    it('should be able to access /#home', function() {
      browser.get('http://localhost:3000')
      expect(ptor.getCurrentUrl()).to.eventually.equal('http://localhost:3000/#/home');
    });

  });


});
