'use strict';

angular.module('FED')
.directive('stars', ["$timeout", function($timeout) {
  function starsController($scope) {

  }
  return {
    templateUrl: 'pages/stars-template.html',
    restrict: 'AE',
    scope: {
      rating: '=',
      max: '='
    },
    controller: starsController,
    link: function(scope, element, attributes) {

      // SETTING THE RATING TO 0 STARS UNLOCKS THE ABILITY TO TEST THE RATING SYSTEM
      var starWidth = 0,
          testing = (scope.rating == 0);

      scope.stars = new Array(scope.max);

      if(!testing) {
        $(element).addClass('static');
      }

      scope.$watch('rating', function() {
        fillStars();
      });

      // FIND THE WIDTH OF STAR ELEMENT AFTER LOAD
      $timeout(function(){
        starWidth = $('.star').width();
        fillStars();
      });

      scope.newRating = function(num) {
        if(testing) scope.rating = num+1;
      }

      function fillStars() {
        $(element).find('.stars-fill').css('width',(starWidth*scope.rating)+'px');
      }
    },
    replace: true
  };

}]);