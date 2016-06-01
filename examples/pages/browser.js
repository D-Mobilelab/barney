'use strict';

angular.module('example').controller('BrowserCtrl', [
	'$scope', '$location', '$window', 'BarneyBrowser',
	function($scope, $location, $window, Browser){

		$scope.prevpath = Browser.getPrevPath();
		console.log($scope.prevpath);
		$scope.prevstate = Browser.getPrevState();
		console.log($scope.prevstate);

		$scope.goBack = function(){
			Browser.goBack();
		}
		
		$scope.getQueryParams = function(){
			$scope.queryStrings = Browser.getQueryParams();
			console.log($scope.queryStrings);
		}

		$scope.getQueryParamsVoid = function(){
			$scope.queryStrings = Browser.getQueryParams('http://foo.bar');
			console.log($scope.queryStrings);
		}

		$scope.getQueryParamsAfter = function(){
			$scope.queryStrings = Browser.getQueryParams('http://foo.bar/#!/ciao?pippo=no&nonsono=io&masono=pluto');
			console.log($scope.queryStrings);
		}

		$scope.getQueryParamsBefore = function(){
			$scope.queryStrings = Browser.getQueryParams('http://foo.bar?pippo=no&nonsono=io&masono=pluto/#!/ciao');
			console.log($scope.queryStrings);
		}

		$scope.addQueryParams = function(){
			$scope.queryStrings = Browser.addQueryParams({ hello: 'world' });
			console.log($scope.queryStrings);
		}

		$scope.addQueryParamsVoid = function(){
			$scope.queryStrings = Browser.addQueryParams({ hello: 'world' }, 'http://foo.bar');
			console.log($scope.queryStrings);
		}

		$scope.addQueryParamsAfter = function(){
			$scope.queryStrings = Browser.addQueryParams({ hello: 'world' }, 'http://foo.bar/#!/ciao?pippo=no&nonsono=io&masono=pluto');
			console.log($scope.queryStrings);
		}

		$scope.addQueryParamsBefore = function(){
			$scope.queryStrings = Browser.addQueryParams({ hello: 'world' }, 'http://foo.bar?pippo=no&nonsono=io&masono=pluto/#!/ciao');
			console.log($scope.queryStrings);
		}

		Browser.mediaMatcher("(min-width: 1024px)", function(mql){
            console.log("Media query changes to:", mql, mql.matches); 
        });

	}
]);
