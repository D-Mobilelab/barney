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
			.when('/browser', {
				templateUrl: 'pages/browser.html',
				controller: 'BrowserCtrl'
			})
			.when('/config', {
				templateUrl: 'pages/config.html',
				controller: 'ConfigCtrl'
			})
			.when('/dict', {
				templateUrl: 'pages/dict.html',
				controller: 'DictCtrl'
			})
			.when('/infinite', {
				templateUrl: 'pages/infinite.html',
				controller: 'InfiniteCtrl'
			})
			.when('/livehtml', {
				templateUrl: 'pages/livehtml.html',
				controller: 'LivehtmlCtrl'
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

		hljsServiceProvider.setOptions({
			// replace tab with 4 spaces
			tabReplace: '    '
		});

}])

.run(['$rootScope', 'BarneyMeta', 'BarneyBrowser',
	function ($rootScope, Meta, Browser) {

		Meta.init({
			title: "standard title",
			description: "standard description",
			image: "standard-image.jpg"
		});

		Browser.init();

	}
]);
