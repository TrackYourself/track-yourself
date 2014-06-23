var expect = require('chai').expect;

describe('Water controllers', function() {

  beforeEach(function(done) {
    angular.mock.module('trackerApp');
    done();
  });

  it('display last controller should exist and have waterRecord', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('waterDisplayLastCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('waterRecord');
    });
  });

  it('input controller should exist, have waterRecord, have waterEntered method', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('waterInputCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('waterRecord');
      expect(scope).to.have.property('waterEntered');
    });
  });

  it('display all controller should exist and have waterRecords', function() {
    inject(function($controller) {
      var scope = {};
      var myCtrl = $controller('waterDisplayAllCtrl', {$scope: scope});
      expect(myCtrl).to.exist;
      expect(scope).to.have.property('waterRecords');
    });
  });

});
