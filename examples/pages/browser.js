'use strict';

angular.module('example').controller('BrowserCtrl', [
	'$scope', '$location', '$window', 'BarneyBrowser',
	function($scope, $location, $window, Browser){

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
        });

        console.log($location.absUrl(), Browser.getQueryParams());
        console.log('http://foo.bar/#!/ciao?pippo=no&nonsono=io&masono=pluto', Browser.getQueryParams('http://foo.bar/#!/ciao?pippo=no&nonsono=io&masono=pluto'));
        console.log('http://foo.bar?pippo=no&nonsono=io&masono=pluto/#!/ciao', Browser.getQueryParams('http://foo.bar?pippo=no&nonsono=io&masono=pluto/#!/ciao'));

	}
]);
