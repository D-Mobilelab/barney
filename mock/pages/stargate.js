'use strict';

angular.module('mock').controller('StargateCtrl', [
	'$scope', 'BarneyStargate',
	function($scope, Stargate){

		$scope.activate = function(){
			Stargate.activate();
		}

		$scope.init = function(){
			Stargate.init();
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
