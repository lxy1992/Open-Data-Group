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
        $scope.setWeight = function (weight) {
            return
        };
        $scope.sports = [];
        Sport.getList().then(function (data, index) {
            $scope.sports = data;
            $scope.tableParams = new NgTableParams({
                count: 5 //每页显示数量
            }, {
                paginationMaxBlocks: 5
                , paginationMinBlocks: 2
                , data: $scope.sports
            });

            console.log($scope.sports);
            //        $scope.tableParams.reload();
        });

        $scope.applyGlobalSearch = function () {
            var term = $scope.globalSearchTerm;

            $scope.tableParams.filter({
                "Activity(1 hour)": term
            });
        }

        $scope.$watch("globalSearchTerm", function (oldVal, newVal) {
            if (oldVal) {
                $scope.applyGlobalSearch();
            }
        })

        // add food to list.
        $scope.addSport = function (index) {
            console.log(index);
            var sport = data.plain()[0].originalElement.report.sport;

            var model = {

                name: sport.name

            };
            $scope.sports.push(model);
        };


        //remove one sport
        $scope.remove = function (index) {
            var ans = confirm("Do you want to remove this sport？");
            if (ans) {
                $scope.sports.splice(index, 1);
            }
        }

        //remove all sports
        $scope.removeall = function () {
            var index;
            var ans = confirm("Do you want to remove all sports？");
            if (ans) {
                $scope.sports = [];
            }
        }

        // reduce sport quantity by 1
        $scope.reduce = function (index) {
            if ($scope.sports[index].quantity != 1) {
                $scope.sports[index].quantity--;
            } else {
                var ans = confirm("Do you want to remove this sport？");
                if (ans) {
                    $scope.sports.splice(index, 1);
                } else {
                    $scope.sports[index].quantity = 1;
                }
            }
        }

        $scope.add = function (index) {
            $scope.sports[index].quantity++;
        }

    });