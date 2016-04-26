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
    'restangular',
    'ngTable',
    'puElasticInput'
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
            })

            .when('/personal', {
                templateUrl: 'views/personal.html'
                , controller: 'PersonalCtrl'
            })
            //            .when('/account', {
            //                templateUrl: 'views/account.html'
            //                , controller: 'accountCtrl'
            //            })
            /*
                        .when('/sport/:id', {
                            templateUrl: 'views/sport-view.html'
                            , controller: 'SportViewCtrl'
                        })*/
            .when('/sport/:id', {
                templateUrl: 'views/sport-view.html'
                , controller: 'SportViewCtrl'
            })
//            .when('/user', {
            //              templateUrl: 'views/user.html',
            //              controller: 'UserCtrl'
            //            })
            .when('/personal', {
              templateUrl: 'views/personal.html',
              controller: 'PersonalCtrl',
        
            })
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
    .factory('NDBRestangular', function (Restangular) {
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
    .factory('Search', function (NDBRestangular) {
        return NDBRestangular.service('search');
    })
    .factory('Food', function (NDBRestangular) {
        return NDBRestangular.service('reports');
    })
    .factory('ServerRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:3000');

        });
    })
    .factory('Sport', function (ServerRestangular) {
        return ServerRestangular.service('sport');
    })
    .factory('User', function (ServerRestangular) {
        return ServerRestangular.service('user');
    })

    .factory('FoodRecord', function (ServerRestangular) {
        return ServerRestangular.service('foodRecord');
    })
    .factory('ExerciseRecord', function (ServerRestangular) {
        return ServerRestangular.service('exerciseRecord');
    });













