'use strict';

describe('Controller: FoodCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var FoodCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoodCtrl = $controller('FoodCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FoodCtrl.awesomeThings.length).toBe(3);
  });
});
