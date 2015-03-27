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

angular.module('FED')
.controller('TestController',['$scope', function ($scope) {
	// console.log("TestController");
	$scope.showOnly = 0;
	$scope.reviewsObj = {
		max: 5,
		reviews: [
							// SETTING TO 0 STARS ALLOWS FOR TESTING
							{
								rating: 0,
								title: "This review is adjustable.",
								review: "Star rating has been unlocked for this review. Assuming that the system does not allow 0 stars.",
								user: "Tester"
							},
							{
								rating: 3,
								title: "Pretty Good",
								review: "I've heard there are troubles of more than one kind; some come from ahead, and some come from behind. But I've brought a big bat. I'm all ready, you see; now my troubles are going to have troubles with me!",
								user: "Jane Smith"
							},
							{
								rating: 2,
								title: "Meh",
								review: "You have brains in your head. You have feet in your shoes. You can steer yourself in any direction you choose. You're on your own, and you know what you know. And you are the guy who'll decide where to go.",
								user: "Joe Adams"
							},
							{
								rating: 5,
								title: "Awesome!",
								review: "Adults are obsolete children.",
								user: "Vicky Tolm"
							}
						]
	};

	$scope.$watch('reviewsObj.reviews',function(){
    $scope.avgRating = getAvg();
  },true)

	function getAvg() {
		var total = 0;
		$.each($scope.reviewsObj.reviews,function() {
		    total += this.rating;
		});
		return (total/$scope.reviewsObj.reviews.length).toFixed(1);
	}

	$scope.$on('filterReview', function(e, index){
		$scope.showOnly = index;
	})

}]);
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