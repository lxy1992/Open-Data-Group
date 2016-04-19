'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SportCtrl
 * @description
 * # SportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SportCtrl', function ($scope, Sport, NgTableParams) {
    $scope.setForWeight = 150;
    $scope.setWeight = function(weight){
      return
    };
    $scope.sports = [];
    Sport.getList().then(function(data){
        $scope.sports = data;
        $scope.tableParams = new NgTableParams({
            count: 5 //每页显示数量
        }, {
            paginationMaxBlocks: 5,
            paginationMinBlocks: 2,
            data: $scope.sports
        });

        console.log($scope.sports);
//        $scope.tableParams.reload();
    });

    $scope.applyGlobalSearch = function() {
        var term = $scope.globalSearchTerm;
        if ($scope.isInvertedSearch){
            term = "!" + term;
        }
        $scope.tableParams.filter({ "Activity(1 hour)": term });
    }

    $scope.$watch("globalSearchTerm", function(oldVal, newVal){
        if (oldVal) {
            $scope.applyGlobalSearch();
        }
    })

  });
