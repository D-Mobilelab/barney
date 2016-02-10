'use strict';

angular.module('example').controller('LoggerCtrl', [
	'BarneyLogger', 'BarneyRotatingLogger', '$scope',
	function(Logger, RotatingLogger, $scope){

		$scope.enabled = Logger.isEnabled();

		$scope.enable = function(){
			Logger.init({
				enabled: true,
				level: 'log'
			});

			RotatingLogger.init({
				maxSize: 100,
				sliding: true,
				recordingEnabled: true,
				enabled: true,
				level: 'log'
			});

			$scope.enabled = Logger.isEnabled();
		}

		$scope.disable = function(){
			Logger.init({
				enabled: false
			});

			RotatingLogger.init({
				enabled:false
			});

			$scope.enabled = Logger.isEnabled();
		}

		$scope.log = function(){
			Logger.log($scope.string, {key: "value"}, [1,2,3]);
			RotatingLogger.log($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.info = function(){
			Logger.info($scope.string, {key: "value"}, [1,2,3]);
			RotatingLogger.info($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.table = function(){
			Logger.table({key: $scope.string}, {key: "value"}, [1,2,3]);
			RotatingLogger.table({key: $scope.string}, {key: "value"}, [1,2,3]);
		}

		$scope.warn = function(){
			Logger.warn($scope.string, {key: "value"}, [1,2,3]);
			RotatingLogger.warn($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.error = function(){
			Logger.error($scope.string, {key: "value"}, [1,2,3]);
			RotatingLogger.error($scope.string, {key: "value"}, [1,2,3]);
		}

		$scope.startRecording = function(){
			RotatingLogger.startRecording();
		}

		$scope.endRecording = function(){
			RotatingLogger.endRecording();
		}
	}
]);
