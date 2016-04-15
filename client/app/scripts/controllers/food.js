'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
angular.module('clientApp')
  .controller('FoodCtrl', function ($scope, Food, $routeParams) {
    var params = {format:'json',q:$routeParams.name, sort:'n','max':25,'offset':0,'api_key':'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7'};
    if(!$routeParams.name || $routeParams == ''){
        $scope.foods = [];
    } else{
        $scope.foods = Food.getList(params).$object;
    }    
  });
