var expect = require('chai').expect;
//require('./../../modules/sleep/sleep-module.js');

//var $controller = angular.$injector.get('$controller');

describe('Sleep controllers', function() {

  beforeEach(function(done) {
    angular.mock.module('trackerApp');
    done();
  });

  it('display last controller should exist and have sleepRecord', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('sleepDisplayLastCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('sleepRecord');
    });
  });

  it('input controller should exist, have sleepRecord, have sleepEntered method', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('sleepInputCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('sleepRecord');
      expect(scope).to.have.property('sleepEntered');
    });
  });

  it('display all controller should exist and have sleepRecord', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('sleepDisplayAllCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('sleepRecords');
    });
  });

});
