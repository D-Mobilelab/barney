'use strict';

angular.module('mock').controller('CallbackyBindCtrl', [
	'$scope', 'BarneyCallbacky', 'BarneyLogger',
	function($scope, Callbacky, Logger){

		Logger.init({
			enabled: true
		})

		Callbacky.init({
			verbose: true,
			logger: Logger
		})

		$scope.bindBlue = function(){
			var name = $scope.blueText;
			Callbacky.bind('blue', function(){
				console.log("Hi blue, I'm " + $scope.blueText);
			})
		}

		$scope.bindRed = function(){
			var name = $scope.redText;
			Callbacky.bind('red', function(){
				console.log("Hi red, I'm " + $scope.redText);
			})
		}
		
	}
]);

angular.module('mock').controller('CallbackyTriggerCtrl', [
	'$scope', 'BarneyCallbacky',
	function($scope, Callbacky){

		$scope.triggerBlue = function(){
			Callbacky.trigger('blue');
		}

		$scope.triggerRed = function(){
			Callbacky.trigger('red');
		}
		
	}
]);
