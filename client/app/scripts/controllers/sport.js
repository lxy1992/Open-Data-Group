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
        $scope.sportList = [];
        Sport.getList().then(function (data, index) {
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

        $scope.applyGlobalSearch = function () {
            var term = $scope.globalSearchTerm;

            $scope.tableParams.filter({
                "Activity(1 hour)": term
            });
        }

        $scope.$watch("globalSearchTerm", function (newVal) {
            if (newVal) {
                $scope.applyGlobalSearch();
            }
        })

        // add food to list.
        $scope.addSport = function (sport) {
            //console.log(sport);
            // if already in list, add time.
            for(var i = 0; i < $scope.sportList.length; i++){
                if ($scope.sportList[i].name === sport["Activity(1 hour)"]) {
                    $scope.sportList[i].time ++;
                    return;
                }
            }
            // else push to list
            var model = {
                name: sport["Activity(1 hour)"],
                perHourLb: sport["1 lb"],
                time: 1.0
            };
            $scope.sportList.push(model);
        };


        //remove one sport
        $scope.remove = function (index) {
            var ans = confirm("Do you want to remove this sport？");
            if (ans) {
                $scope.sportList.splice(index, 1);
            }
        }

        //remove all sports
        $scope.removeall = function () {
            var index;
            var ans = confirm("Do you want to remove all sports？");
            if (ans) {
                $scope.sportList = [];
            }
        }

        // reduce sport quantity by 1
        $scope.reduce = function (index) {
            if ($scope.sportList[index].time != 0.1) {
                $scope.sportList[index].time = parseFloat(($scope.sportList[index].time - 0.1).toFixed(1));
            } else {
                var ans = confirm("Do you want to remove this sport？");
                if (ans) {
                    $scope.sportList.splice(index, 1);
                } else {
                    $scope.sportList[index].time = 0.1;
                }
            }
        }

        $scope.add = function (index) {
            $scope.sportList[index].time = parseFloat(($scope.sportList[index].time + 0.1).toFixed(1));
        }

        //return total energy of all exercise
        $scope.totalEnergy = function () {
            var total = 0;
            angular.forEach($scope.sportList, function (item) {
                total += item.perHourLb * item.time * $scope.setForWeight;
            });
            $scope.total = total;
            return total;
        }

    });