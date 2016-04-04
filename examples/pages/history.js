'use strict';

angular.module('example').controller('HistoryCtrl', [
	'$scope', 'BarneyHistory',
	function($scope, HistoryAdp){

		$scope.prevpath = HistoryAdp.getPrevPath();
		console.log($scope.prevpath);
		$scope.prevstate = HistoryAdp.getPrevState();
		console.log($scope.prevstate);

	}
]);
