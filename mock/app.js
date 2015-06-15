'use strict';

angular.module('mock', [
	'ngRoute',
	'barney.logger',
	'barney.config',
	'barney.dict',
	'barney.analytics'
])

.config(['$routeProvider',
	function ($routeProvider) {
		
		$routeProvider
			.when('/logger', {
				templateUrl: 'pages/logger.html',
				controller: 'LoggerCtrl'
			})
			.when('/config', {
				templateUrl: 'pages/config.html',
				controller: 'ConfigCtrl'
			})
			.when('/dict', {
				templateUrl: 'pages/dict.html',
				controller: 'DictCtrl'
			})
			.when('/analytics', {
				templateUrl: 'pages/analytics.html',
				controller: 'AnalyticsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

}]);
