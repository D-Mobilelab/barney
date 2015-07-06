'use strict';

angular.module('barney.masonry').directive('barneyMasonry', 
	['$timeout', 
	function($timeout) {

		return {
			restrict: 'A',
			link: function(scope, element, attr){
				var className = attr.barneyMasonry;
				element.addClass(className);

				if (scope.$last){
					$timeout(function () {
						var parent = element.parent();
						var masonry = new Masonry(parent[0], {
							itemSelector: '.' + className
						});
					});
				}
			}
		};

}]);