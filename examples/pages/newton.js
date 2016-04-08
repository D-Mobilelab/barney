'use strict';

angular.module('example').controller('NewtonCtrl', [
    '$scope', 'BarneyNewton', 'BarneyLogger',
	function($scope, NewtonAdp, Logger){

		Logger.init({
			enabled: true
		});

		Newton.getSharedInstanceWithConfig({ secret: '<local_host>' });
		Newton.getSharedInstance().setDebug(true);

		NewtonAdp.init({
			enabled: true,
			verbose: true,
			logger: Logger
		});
		
		NewtonAdp.trackPage({
			page: '/homepage',
			title: 'Home Page'
		});
	
		NewtonAdp.trackEvent('Azione', {
			category: 'Categoria',
			label: 'Etichetta',
			value: 6,
			Valuable: 'yes',
			Action: 'yes'
		});

		$scope.startBeat = function(keyword){
			NewtonAdp.startHeartbeat(keyword, {
				category: 'Heartbeat',
	            label: '<test>',
	            valuable: 'No',
	            action: 'No',
	        });
		};

		$scope.startBeat('atestheart');


		var stopAllBeat = function(){
			NewtonAdp.stopAllHeartbeat();
		};

		setTimeout(function(){
			$scope.startBeat('secondheart');
			$scope.startBeat('atestheart');
			
			var a = NewtonAdp.heartbeatsList()
			console.log('List: ', a);
		}, 5000);

		setTimeout(function(){
			stopAllBeat();
		}, 20000); 
	}
]);
