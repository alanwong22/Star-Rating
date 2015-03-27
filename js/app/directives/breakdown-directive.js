'use strict';

angular.module('FED')
.directive('breakdown', ["$timeout", "$rootScope", function($timeout, $rootScope) {
  function breakdownController($scope) {
    // console.log("breakdownController");
  }
  return {
    templateUrl: 'pages/breakdown-template.html',
    restrict: 'AE',
    scope: {
      obj: '='
    },
    controller: breakdownController,
    link: function(scope, element, attributes) {
      
      scope.$watch('obj', function(){
        reBreakdown();
      }, true)

      function reBreakdown(){
        scope.breakdown = Array.apply(null, Array(scope.obj.max)).map(function () { return 0 });
        var fillWidth = $('.box').width(),
            fillBoxes = $(element).find('.breakdown-fill');
        $.each(scope.obj.reviews, function(index, val){
          var rating = val.rating - 1;
          scope.breakdown[rating] = scope.breakdown[rating]+1;
        })
        scope.breakdown.reverse();
        $.each(scope.breakdown, function(index, val){
          $(fillBoxes[index]).css('width',((scope.breakdown[index]/scope.obj.reviews.length)*fillWidth)+'px');
        })
      }

      $timeout(function(){
        reBreakdown();
      })

      scope.filterReviews = function(index) {
        $rootScope.$broadcast('filterReview', index);
      }
    },
    replace: true
  };

}]);