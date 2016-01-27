angular.module('testApp').directive('infiniteScroll', 
	['$window', 
	function($window) {

  		return { 
     		restrict: 'A',
     		scope:{
     		foo: '&',
     		enable: '=',
     		distance: '@'
		},

    	link: function(scope, element, attrs) {
    		var offset;
    		var typeOfDistance = typeof scope.distance;

    		/*if (typeOfDistance !== 'undefined'){
                if (typeOfDistance !== 'number'){
                    throw new Error('Illegal type "' + typeOfDistance + '" for typeOfDistance, "number" expected');
                } else {
                    offset = scope.distance;
                }*/
            if(scope.distance){
            	offset = parseInt(scope.distance);
            } else {
            	offset = 0;
            }

            console.log(offset);

	    	//Infinite - Scroll
			angular.element($window).bind("scroll", function() {
				if(scope.enable){
					var windowHeight = "innerHeight" in window ? window.innerHeight
						: document.documentElement.offsetHeight;
					var body = document.body, html = document.documentElement;
					var docHeight = Math.max(body.scrollHeight,
						body.offsetHeight, html.clientHeight,
						html.scrollHeight, html.offsetHeight);
					var windowBottom = windowHeight + window.pageYOffset;

					if (windowBottom + offset >= docHeight ) {
						scope.foo();
						scope.$apply();
					}
				}
		 	});
		}
	}
}]);