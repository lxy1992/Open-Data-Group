'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SportCtrl
 * @description
 * # SportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('SportCtrl', function ($scope, Sport, NgTableParams, ExerciseRecord) {
        $scope.setForWeight = 150;
        $scope.eventIndex = 0;
        $scope.setWeight = function (weight) {
            return
        };
        $scope.sports = [];
        $scope.sportList = [];
        Sport.getList().then(function (data, index) {
            $scope.sports = data;
            $scope.tableParams = new NgTableParams({
                count: 5 
            }, {
                paginationMaxBlocks: 5,
                paginationMinBlocks: 2,
                data: $scope.sports
            });
            $scope.getEventTitle = function(){
            //console.log($scope.sports[$scope.eventIndex]);
            if ($scope.eventTitle) {
                return $scope.eventTitle;
            }
            return $scope.sports[$scope.eventIndex]["Activity(1 hour)"];
        }
            //console.log($scope.sports);
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

        $("#st").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

        $("#et").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

        $scope.setEventTitle = function(title, hour){
            $scope.eventTitle = title;
            $scope.eventDuration = hour;
        }

        

        $scope.getStartTime = function(){
            //console.log($scope.sports[$scope.eventIndex]);
            if ($scope.startTime) {
                return $scope.startTime;
            }
            var time = new Date();
            return moment(time).format('YYYY-MM-DD HH:mm');
        }

        $scope.getEndTime = function(){
            //console.log($scope.sports[$scope.eventIndex]);
            if ($scope.endTime) {
                return $scope.endTime;
            }
            var time = new Date();
            time.setTime(time.getTime() + $scope.eventDuration * 60 * 60 * 1000);
            return moment(time).format('YYYY-MM-DD HH:mm')
        }

        $scope.getDescription = function(){
            //console.log($scope.sports[$scope.eventIndex]);
            if ($scope.description) {
                return $scope.description;
            }
            return "Exercise to burn extra calories.";
        }

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
        $scope.sportTotalEnergy = function () {
            var total = 0;
            angular.forEach($scope.sportList, function (item) {
                total += item.perHourLb * item.time * $scope.setForWeight;
            });
            $scope.total = total;
            return total;
        }

        $scope.recordExercise = function(){
            if ($scope.sportList.length === 0) {
                alert("Please add exercise first!");
                return;
            }
            var list = $scope.sportList;
            list.forEach(function(sport){
                sport.energy = sport.perHourLb*sport.time*$scope.setForWeight;
            });
            var params = {
                userId : "fakeUser",
                exerciseList: list,
                totalEnergy: $scope.sportTotalEnergy()
            }
            ExerciseRecord.post(params).then(function(){
                alert("Success!");
            })
        }

    });





