'use strict';

angular.module('example').controller('BrowserCtrl', [
	'$scope', '$location', 'BarneyBrowser',
	function($scope, $location, Browser){

		$scope.prevpath = Browser.getPrevPath();
		console.log($scope.prevpath);
		$scope.prevstate = Browser.getPrevState();
		console.log($scope.prevstate);

		$scope.oldUrl = $location.absUrl();
		$scope.newUrl = Browser.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		});

		$scope.oldUrlTwo = 'http://www.google.com';
		$scope.newUrlTwo = Browser.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		}, 'http://www.google.com');
		
		$scope.getCurrentQueryString = function(){
			$scope.queryStrings = Browser.getCurrentQueryString();
		}

		Browser.mediaMatcher("(min-width: 1024px)", function(mql){
            console.log("Media query changes to:", mql, mql.matches); 
        })

	}
]);
