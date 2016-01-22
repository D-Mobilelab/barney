'use strict';

angular.module('mock').controller('StargateCtrl', [
	'$scope', 'BarneyStargate',
	function($scope, Stargate){

		$scope.isActive = function(){
			Stargate.isActive(function(value){
				console.log("isActive: " + value);
			});
		}

		$scope.init = function(){
			Stargate.init();
		}

		$scope.initCallback = function(){
			Stargate.init({
				onHandshake: function(){
					console.log("onHandshake");
				}
			});
		}

		$scope.openUrl = function(){
			Stargate.openUrl({
				url: 'http://www.google.it'
			});
		}

		$scope.openUrlFallback = function(){
			Stargate.openUrl({
				fallback: function(){ 
					console.log('http://www.google.it')
				}
			});
		}		

	}
]);
