'use strict';

angular.module('example').controller('CallbackyBindCtrl', [
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

angular.module('example').controller('CallbackyTriggerCtrl', [
	'$scope', 'BarneyCallbacky',
	function($scope, Callbacky){

		$scope.triggerBlue = function(){
			Callbacky.trigger('blue', {iam: 'blue'});
		}

		$scope.triggerRed = function(){
			Callbacky.trigger('red', {iam: 'red'});
		}
		
	}
]);
