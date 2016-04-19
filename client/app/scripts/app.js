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
    'ngCookies'
    , 'ngRoute'
    , 'restangular'
    , 'ngTable'
    , 'puElasticInput'
  ])
    .constant('NDB_KEY', 'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7')
    .config(function ($routeProvider, $httpProvider, RestangularProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
                , controller: 'MainCtrl'
                , controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
                , controller: 'AboutCtrl'
                , controllerAs: 'about'
            })
            .when('/', {
                templateUrl: 'views/food.html'
                , controller: 'FoodCtrl'
            })/*
            .when('/sport', {
                templateUrl: 'views/sport.html'
                , controller: 'SportCtrl'
            })
            .when('/sport/:id', {
                templateUrl: 'views/sport-view.html'
                , controller: 'SportViewCtrl'
            })*/
            .otherwise({
                redirectTo: '/'
            });
    })
    /*.factory('NDB', function ($resource) {
      return $resource('http://api.nal.usda.gov/ndb/:func', {
        api_key : 'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7',
        format : 'json'
      } , {
        search : {
          method : "GET",
          params : {
            func : 'search',
            api_key : 'skDbzCwWhZtyMGlQyLFTt0XdWdoifWKWkxrkDxY7',
            format : 'json'
          }
        }
      });
    })*/
    .factory('FoodRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            //RestangularConfigurer.setBaseUrl('http://localhost:3000');
            RestangularConfigurer.setBaseUrl('http://api.nal.usda.gov/ndb/');
            RestangularConfigurer.setResponseInterceptor(
                function (data, operation, what) {
                    return [data];
                });
            RestangularConfigurer.setErrorInterceptor(function (response, deferred, responseHandler) {
                if (response.status === 404) {
                    return false; // error handled
                }
                return true; // error not handled
            });
            RestangularConfigurer.setResponseExtractor(function (response) {
                var newResponse = response;
                if (angular.isArray(response)) {
                    angular.forEach(newResponse, function (value, key) {
                        newResponse[key].originalElement = angular.copy(value);
                    });
                } else {
                    newResponse.originalElement = angular.copy(response);
                }

                return newResponse;
            });
        });
    })
    .factory('Search', function (FoodRestangular) {
        return FoodRestangular.service('search');
    })
    .factory('Food', function (FoodRestangular) {
        return FoodRestangular.service('reports');
    })
    .factory('SportRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:3000');

        });
    })
    .factory('Sport', function (SportRestangular) {
        return SportRestangular.service('sport');
    });