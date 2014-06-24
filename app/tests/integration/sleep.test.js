/* jshint expr:true */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var utils = require('./../../../backend/tests/utils.js');

describe('Sleep routes', function() {
  
  var ptor;

  before(function() {
    require('mongoose').connection.collections.users.drop();
    ptor = protractor.getInstance();

    var now = new Date();
    browser.get('http://localhost:3000/#/register');
    element(by.model('user.name')).sendKeys('Tester');
    element(by.model('user.email')).sendKeys(now.toString().replace(' ', '') + '@gmail.com');
    element(by.model('user.password')).sendKeys('testing123');
    element(by.id('register-submit')).click();

    expect(ptor.getCurrentUrl()).to.eventually.equal('http://localhost:3000/#/dashboard');

  });

  it('should be able to add a sleep record', function() {
    browser.get('http://localhost:3000/#/sleep/add');

    var sleepInput = element(by.model('sleepRecord.sleep'));
    expect(sleepInput).to.eventually.exist;

    element(by.model('sleepRecord.sleep')).sendKeys('2014-06-09 23:45:16');
    element(by.model('sleepRecord.wake')).sendKeys('2014-06-10 09:45:16');

    element(by.id('sleep-submit')).click();

    expect(ptor.getCurrentUrl()).to.eventually.equal('http://localhost:3000/#/sleep/all');
  });

  after(function() {
    require('mongoose').connection.collections.users.drop();
  });

});
