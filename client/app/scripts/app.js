'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngCookies',
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/food', {
        templateUrl: 'views/food.html',
        controller: 'FoodCtrl',
        controllerAs: 'food'
      .when('/sport', {
        templateUrl: 'views/sport.html',
        controller: 'SportCtrl',
        controllerAs: 'sport'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('FoodRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      //RestangularConfigurer.setBaseUrl('http://localhost:3000');
      RestangularConfigurer.setBaseUrl('http://api.nal.usda.gov/ndb/');
      RestangularConfigurer.setResponseInterceptor(
      function(data, operation, what) {
        console.log(data);
        return [data];
      });
    });
  })
  .factory('Food', function(FoodRestangular) {
    return FoodRestangular.service('search');
  })
  .factory('SportRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://localhost:3000');
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
.factory('Sport', function(MovieRestangular) {
  return SportRestangular.service('sport');
});
