'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:InstantSearchCtrl
 * @description
 * # InstantSearchCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('InstantSearchCtrl', function ($scope, Food, Search) {
    var params = {format:'json', sort:'n','max':25,'offset':0, api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7'};
    $scope.list = [];

    //this.results = Food.getList(params)[0].$object;
    $scope.$watch('query', function(oldVal, newVal, scope){
      if (oldVal)
        params.q = oldVal;
      Search.getList(params).then(function(data){
        $scope.results = data.plain()[0].originalElement;
        console.log($scope.results);
      });
      
      $scope.a = {a:[1,2,3]}
      //$scope.results = $scope.results[0].list.item;
    });

    $scope.getDetail = function(id){
        console.log(id);
        var params = {format:'json', type: 'b', api_key:'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7', ndbno:id};
        Food.getList(params).then(function(data){
            $scope.list.push(data.plain()[0].originalElement);
        })
    }

  });