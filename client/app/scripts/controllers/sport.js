'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SportCtrl
 * @description
 * # SportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SportCtrl', function ($scope, Sport) {
    $scope.sport = Sport.getList().$object;
  });
