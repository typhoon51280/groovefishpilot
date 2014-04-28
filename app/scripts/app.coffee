'use strict'

angular
  .module('grooveangularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/search',
        templateUrl: 'views/search.html'
        controller: 'MainCtrl'
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'

