'use strict';

angular.module('mock', [
	'ngRoute',
	'barney.logger',
	'barney.config',
	'barney.dict',
	'barney.analytics',
	'barney.newtontrack',
	'barney.masonry', 
	'barney.meta' 
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
			.when('/newtontrack', {
				templateUrl: 'pages/newtontrack.html',
				controller: 'NewtontrackCtrl'
			})
			.when('/masonry', {
				templateUrl: 'pages/masonry.html',
				controller: 'MasonryCtrl'
			})
			.when('/meta', {
				templateUrl: 'pages/meta.html',
				controller: 'MetaCtrl'
			})
			.when('/meta2', {
				templateUrl: 'pages/meta.html',
				controller: 'MetaTwoCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

}])

.run(['$rootScope', 'BarneyMeta',
	function ($rootScope, Meta) {

		Meta.init({
			title: "standard title",
			description: "standard description",
			image: "standard-image.jpg"
		});

		$rootScope.$on('$routeChangeStart', function(){
			Meta.revert();
		});

	}
]);
