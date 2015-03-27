'use strict';

angular.module('FED', [
	'ngRoute'
])
.config(function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
    .when('/', {
      templateUrl: 'pages/test.html',
      controller: 'TestController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
