'use strict';

angular.module('example', [
	'ngRoute',
	'barney',
	'hljs'
])

.config(['$routeProvider', '$locationProvider', 'hljsServiceProvider',
	function ($routeProvider, $locationProvider, hljsServiceProvider) {

		$locationProvider.hashPrefix("!");
		
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
			.when('/history', {
				templateUrl: 'pages/history.html',
				controller: 'HistoryCtrl'
			})
			.when('/livehtml', {
				templateUrl: 'pages/livehtml.html',
				controller: 'LivehtmlCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

		hljsServiceProvider.setOptions({
			// replace tab with 4 spaces
			tabReplace: '    '
		});

}])

.run(['$rootScope', 'BarneyMeta', 'BarneyHistory',
	function ($rootScope, Meta, HistoryAdp) {

		Meta.init({
			title: "standard title",
			description: "standard description",
			image: "standard-image.jpg"
		});

		$rootScope.$on('$routeChangeStart', function(){
			Meta.revert();
		});

		HistoryAdp.init();

	}
]);