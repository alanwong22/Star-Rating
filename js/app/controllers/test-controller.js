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