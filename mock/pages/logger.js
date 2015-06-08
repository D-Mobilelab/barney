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
			Logger.log("LOGGER", {key: "value", key2: "value2"}, $scope.string);
		}

		$scope.info = function(){
			Logger.info("LOGGER", {key: "value", key2: "value2"}, $scope.string);
		}

		$scope.debug = function(){
			Logger.debug("LOGGER", {key: "value", key2: "value2"}, $scope.string);
		}

		$scope.warn = function(){
			Logger.warn("LOGGER", {key: "value", key2: "value2"}, $scope.string);
		}

		$scope.error = function(){
			Logger.error("LOGGER", {key: "value", key2: "value2"}, $scope.string);
		}
	}
]);
