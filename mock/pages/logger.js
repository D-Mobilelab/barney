'use strict';

angular.module('mock').controller('LoggerCtrl', [
	'BarneyLogger', '$scope',
	function(Logger, $scope){

		$scope.enabled = Logger.isEnabled();

		$scope.enable = function(){
			Logger.init({
				enabled: true
			});
			$scope.enabled = Logger.isEnabled();
		}

		$scope.disable = function(){
			Logger.init({
				enabled: false
			});
			$scope.enabled = Logger.isEnabled();
		}

		$scope.log = function(){
			Logger.log($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.info = function(){
			Logger.info($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.debug = function(){
			Logger.debug($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.warn = function(){
			Logger.warn($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.error = function(){
			Logger.error($scope.string, {key: "value"}, [1,2,3]);
		}
	}
]);
