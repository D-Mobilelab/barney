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
					search: "?earth=sun",
					href: "",
					reload: function(){}
				}
			});
		});

		// get barney module
		module('barney.utility');

		// inject BarneyUtility service
		inject(function (_BarneyUtility_, _$window_) {
			UtilityService = _BarneyUtility_;
			WindowProvider = _$window_;
			spyOn(WindowProvider.location, "reload");
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

	it('brutalRedirect - location.href changed to url', function(){
		var url = "http://www.google.it";
		UtilityService.brutalRedirect(url);
		expect(WindowProvider.location.href).toEqual(url);
	});

	it('brutalRedirect - location.reload called with true, if user agent contains Safari', function(){
		var url = "http://www.google.it";
		navigator = {
			userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"
		};
		UtilityService.brutalRedirect(url);
		expect(WindowProvider.location.reload).toHaveBeenCalledWith(true);
	});

});