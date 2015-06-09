'use strict';

angular.module('mock', [
    'ngRoute',
    'barney.logger',
    'barney.config'
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
			.otherwise({
				redirectTo: '/'
			});

}]);
