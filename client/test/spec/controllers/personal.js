'use strict';

describe('Controller: PersonalCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PersonalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalCtrl = $controller('PersonalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonalCtrl.awesomeThings.length).toBe(3);
  });
});
