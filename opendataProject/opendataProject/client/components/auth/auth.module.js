'use strict';

angular.module('opendataProjectApp.auth', [
  'opendataProjectApp.constants',
  'opendataProjectApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
