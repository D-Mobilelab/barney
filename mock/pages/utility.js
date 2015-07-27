'use strict';

angular.module('mock').controller('UtilityCtrl', [
	'$scope', '$rootScope', '$location', 'BarneyUtility',
	function($scope, $rootScope, $location, Utility){

		$scope.oldUrl = $location.absUrl();

		$scope.newUrl = Utility.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		});

	}
]);
