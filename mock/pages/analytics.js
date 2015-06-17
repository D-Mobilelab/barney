'use strict';

angular.module('mock').controller('AnalyticsCtrl', [
	'BarneyAnalytics', 'BarneyLogger',
	function(Analytics, Logger){

		Logger.init({
			enabled: true
		});

		Analytics.init({
			enabled: false,
			verbose: true,
			logger: Logger,
			dimensions: {
				'UserStatus': 1,		// Session
				'AccessType': 2,		// User
				'Valuable': 5,			// Hit
				'Action': 8,			// Hit
				'PaymentType': 11		// User
			}
		});

		Analytics.setId(123456789);

		Analytics.setDimension({
			'UserStatus': 'logged',
			'AccessType': 'premium',
			'PaymentType': 'gwallet'
		});

		Analytics.trackPage({
			page: '/homepage',
			title: 'Home Page',
			dimensions: {
				'Valuable': true,
				'Action': false
			}
		});
	
		Analytics.trackEvent({
			category: 'Categoria',
			action: 'Azione',
			label: 'Etichetta',
			value: 6,
			dimensions: {
				'Valuable': true,
				'Action': true
			}
		});
	}
]);
