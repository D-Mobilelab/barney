'use strict';

angular.module('mock').controller('NewtontrackCtrl', [
	'BarneyConfig' , 'BarneyNewtontrack', 'BarneyLogger', '$scope',
	function(Config,Newtontrack, Logger, $scope){

		Logger.init({
			enabled: true
		});
		$scope.spice='pepper';
		Newtontrack.init({
			enabled: false,
			verbose: true,
			logger: Logger,
			secret:Config.get('NEWTON_SECRET_KEY')
		});
		// test method 
		$scope.chiliSpicy = function() {
	        $scope.spice = 'chili';
	    };
		var track1={
				action:'action1',
				properties :{
					'key1':'value1'
				}
			};
		Newtontrack.trackEvent(track1);
		$scope.track1 =JSON.stringify(track1);
		
		
		/**
		 * or you can send only an event name
		 */
		var track2 = {
			action:'action2'
		};
		Newtontrack.trackEvent(track2);
		$scope.track2 =JSON.stringify(track2);

	}
]);
