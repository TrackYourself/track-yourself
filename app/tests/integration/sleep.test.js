/* jshint expr:true */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var utils = require('./../../../backend/tests/utils.js');
var superagent = require('superagent');

describe('loading sleep routes', function() {

  var agent = superagent.agent();

  beforeEach(function() {
    utils.createUserAndLogin(agent);
  });

  it('should load /sleep/add using sleep-input template', function() {
    browser.get('http://localhost:3000/app/#sleep/add');

    var sleepInput = element(by.model('sleepRecord.sleep'));
    expect(sleepInput).to.eventually.exist;

  });

});
