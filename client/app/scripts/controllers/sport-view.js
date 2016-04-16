'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SportViewCtrl
 * @description
 * # SportViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
 .controller('SportViewCtrl', function (
    $scope,
    $routeParams,
    Sport
  ) {
    $scope.viewSport = true;
    $scope.sport = Sport.one($routeParams.id).get().$object;
});
