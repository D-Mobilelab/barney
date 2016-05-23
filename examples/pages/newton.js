'use strict';

angular.module('example').controller('NewtonCtrl', [
    '$scope', 'BarneyNewton', 'BarneyLogger',
	function($scope, NewtonAdp, Logger){

		Logger.init({
			enabled: true
		});

		NewtonAdp.init({
			enabled: true,
			verbose: true,
			logger: Logger,
			secretid: '<local_host>'
		});

		NewtonAdp.customLogin({
			userprops: { 
				msisdn: '+39123456789' 
			},
			userid: '123456789',
			callback: function(){ 

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

				var startBeat = function(keyword){
					NewtonAdp.startHeartbeat(keyword, {
						category: 'Heartbeat',
			            label: '<test>',
			            valuable: 'No',
			            action: 'No',
			        });
				};

				startBeat('firstHeart');

				setTimeout(function(){
					startBeat('secondHeart');
					startBeat('thirdHeart');
					
					console.log('List: ', NewtonAdp.heartbeatsList());
				}, 5000);

				setTimeout(function(){
					NewtonAdp.stopAllHeartbeat();
				}, 10000); 
				
			}
		});
	}
]);
