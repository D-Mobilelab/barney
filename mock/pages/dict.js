'use strict';

angular.module('mock').controller('DictCtrl', [
	'$scope', '$location', 'BarneyDict',
	function($scope, $location, Dict){

		$scope.mode = (!!$location.search().mode) ? $location.search().mode : 'normal'

		Dict.init({
			dict: DICTIONARY,
			showKey: $scope.mode
		});

		console.log("VALUED_KEY", Dict.get('VALUED_KEY'));
		console.log("VOID_KEY", Dict.get('VOID_KEY'));

		$scope.updateMode = function(){
			$location.search('mode', $scope.mode);
		}

	}
]);
