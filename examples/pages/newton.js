'use strict';

angular.module('example').controller('NewtonCtrl', [
	'BarneyNewton', 'BarneyLogger',
	function(NewtonAdp, Logger){

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
	}
]);
