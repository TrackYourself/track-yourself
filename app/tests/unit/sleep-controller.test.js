var expect = require('chai').expect;

describe('Sleep controllers', function() {

  beforeEach(function(done) {
    angular.mock.module('trackerApp');
    done();
  });

  it('main sleep controller should exist, have sleepRecord, have sleepEntered method', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('sleepMainCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('sleepRecord');
      expect(scope).to.have.property('sleepEntered');
    });
  });

  it('display controller should exist and have sleepRecords', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('sleepDisplayCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('sleepRecords');
    });
  });

});
