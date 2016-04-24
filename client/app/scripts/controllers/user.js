'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('UserCtrl', function ($scope, User, $location, $routeParams) {
    $scope.user = {};
    $scope.saveUser = function(){
        User.post($scope.user).then(function(){
            $location.path('/home');
        });
    };
    $scope.checkUser = function(){
        
    };
    $scope.updateUser = function(){
        User.one($routeParams.id).get().then(function(user){
            $scope.user = user;
            $scope.saveUser();
        })
    };
    
  });
