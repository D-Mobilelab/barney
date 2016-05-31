'use strict';

angular.module('example').controller('HistoryCtrl', [
	'$scope', '$location', 'BarneyHistory',
	function($scope, $location, HistoryAdp){

		$scope.prevpath = HistoryAdp.getPrevPath();
		console.log($scope.prevpath);
		$scope.prevstate = HistoryAdp.getPrevState();
		console.log($scope.prevstate);

		$scope.oldUrl = $location.absUrl();
		$scope.newUrl = HistoryAdp.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		});

		$scope.oldUrlTwo = 'http://www.google.com';
		$scope.newUrlTwo = HistoryAdp.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		}, 'http://www.google.com');
		
		$scope.getCurrentQueryString = function(){
			$scope.queryStrings = HistoryAdp.getCurrentQueryString();
		}

		HistoryAdp.mediaMatcher("(min-width: 1024px)", function(mql){
            console.log("Media query changes to:", mql, mql.matches); 
        })

	}
]);
