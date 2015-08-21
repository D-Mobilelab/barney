'use strict';

angular.module('mock').controller('UtilityCtrl', [
	'$scope', '$rootScope', '$location', 'BarneyUtility',
	function($scope, $rootScope, $location, Utility){

		$scope.oldUrl = $location.absUrl();

		$scope.newUrl = Utility.addQueryParams({
			ciao: 'mondo',
			pippo: 'pluto'
		});

		var array_uno = [1, 2, 3, 'a'];
		var array_due = [1, 2, 'b'];
		console.log("array diff", array_uno, array_due, Utility.arrayDiff(array_uno, array_due), Utility.arrayDiff(array_due, array_uno));

	}
]);
