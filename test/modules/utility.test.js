'use strict';

describe('UTILITY -', function () {

	var UtilityService, WindowProvider, LocationProvider;	
	var windowSearch, locationSearch;

	beforeEach(function(){
		// mock $window and $location providers
		angular.mock.module(function($provide) {
			$provide.value('$location', {
				search: function(){
					return { hello: 'world' };
				},
				absUrl: function(){
					return "http://www.google.com/#!/category?hello=world";
				}
			});
			$provide.value('$window', {
				location: {
					search: "?earth=sun"
				}
			});
		});

		// get barney module
		module('barney.utility');

		// inject BarneyUtility service
		inject(function (_BarneyUtility_) {
			UtilityService = _BarneyUtility_;
		});
	});

	it('arrayDiff returns difference between two arrays', function(){
		var arrayUno = ['1', '2', '3'];
		var arrayDue = ['1', '2', '4'];
		expect(UtilityService.arrayDiff(arrayUno, arrayDue)).toEqual(['3']);
		expect(UtilityService.arrayDiff(arrayDue, arrayUno)).toEqual(['4']);
	});
	
	it('getCurrentQueryString returns query string params before and after hashbang', function(){
		expect(UtilityService.getCurrentQueryString()).toEqual({
			hello: 'world',
			earth: 'sun'
		});
	});

	it('addQueryParams add a new query param to current URL', function(){
		expect(UtilityService.addQueryParams({
			venus: 'mercury'
		})).toEqual('http://www.google.com/#!/category?hello=world&venus=mercury');
	});

	it('addQueryParams add a new query param to clean URL passed to method', function(){
		expect(UtilityService.addQueryParams({
			venus: 'mercury'
		}, 'http://www.bing.com')).toEqual('http://www.bing.com?venus=mercury');
	});

	it('addQueryParams add a new query param to URL passed to method', function(){
		expect(UtilityService.addQueryParams({
			venus: 'mercury'
		}, 'http://www.bing.com?jupiter=saturn')).toEqual('http://www.bing.com?jupiter=saturn&venus=mercury');
	});

});