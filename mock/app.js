'use strict';

angular.module('mock', [
	'ngRoute',
	'barney'
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
			.when('/newton', {
				templateUrl: 'pages/newton.html',
				controller: 'NewtonCtrl'
			})
			.when('/meta', {
				templateUrl: 'pages/meta.html',
				controller: 'MetaCtrl'
			})
			.when('/meta2', {
				templateUrl: 'pages/meta.html',
				controller: 'MetaTwoCtrl'
			})
			.when('/utility', {
				templateUrl: 'pages/utility.html',
				controller: 'UtilityCtrl'
			})
			.when('/storage', {
				templateUrl: 'pages/storage.html',
				controller: 'StorageCtrl'
			})
			.when('/callbacky', {
				templateUrl: 'pages/callbacky.html'
			})
			.when('/infinite', {
				templateUrl: 'pages/infinite.html',
				controller: 'InfiniteCtrl'
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
