'use strict';

angular.module('mock', [
    'ngRoute',
    'barney.logger'
])

.config(['$routeProvider',
	function ($routeProvider) {

		$routeProvider
			.when('/logger', {
				templateUrl: 'pages/logger.html',
				controller: 'LoggerCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

}]);
