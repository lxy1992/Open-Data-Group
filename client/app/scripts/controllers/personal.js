'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCtrl
 * @description
 * # PersonalCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('PersonalCtrl', function ($scope, FoodRecord, ExerciseRecord, NgTableParams) {
    
    FoodRecord.getList().then(function (data) {
        $scope.foodRecords = data.plain();
    });
    ExerciseRecord.getList().then(function(data) {
        $scope.exerciseRecords = data.plain();
    });

    var events = [];

    //$scope.foodRecords.forEach

    $('#calendar').fullCalendar({
        // put your options and callbacks here
    })

});