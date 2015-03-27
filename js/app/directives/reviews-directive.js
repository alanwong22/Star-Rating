'use strict';

angular.module('FED')
.directive('reviews', ["$timeout","$interval", function($window, $timeout,$interval) {
  function reviewsController() {

  }
  return {
    templateUrl: 'pages/reviews-template.html',
    restrict: 'AE',
    scope: {
      obj: '=',
      max: '='
    },
    controller: reviewsController,
    link: function(scope, element) {
      
    },
    replace: true
  };

}]);