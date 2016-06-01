'use strict';

describe('BROWSER -', function () {

	var BrowserService;
	var $rootScope;
	var newUrl = '#!/newUrl/';	
	var oldUrl = '#!/oldUrl/';
	var WindowProvider;
	var mockedEvent, mockedLocation;
	var currentWidth = 805, currentHeight = 505;

	var location;

	var changePage = function(){
    	location.url(oldUrl);
		location.url(newUrl);
    }

	beforeEach(function(){
		// mock $window and $location providers
		angular.mock.module(function($provide) {
			$provide.value('$location', {
				search: function(){
					return { hello: 'world' };
				},
				absUrl: function(){
					return "http://www.google.com/#!/category?hello=world";
				},
				url : function(){
					return "#!/category?hello=world"
				}
			});
			$provide.value('$window', {
				location: {
					search: "?earth=sun",
					href: "",
					reload: function(){}
				},
				innerHeight: currentWidth,
	            innerWidth: currentHeight
			});
		});

		module('barney');

		inject(function (_$rootScope_, _BarneyBrowser_, _$window_, _$location_) {
			$rootScope = _$rootScope_;
			BrowserService = _BarneyBrowser_;
			location = _$location_;
			WindowProvider = _$window_;
			mockedLocation = _$location_;
			spyOn(WindowProvider.location, "reload");
			spyOn(mockedLocation, "url");
		});

		location = {
			url: function(){}
		}

		spyOn($rootScope, "$on").and.callFake(function(stringa, method) {
			method.call(null, null, newUrl, oldUrl);
	    });

	    spyOn(location, 'url');
	});


	describe('Init method - ', function(){
		it('expect $rootScope.$on has been called', function(){
			BrowserService.init();
			expect($rootScope.$on).toHaveBeenCalled();
		});

		it('expect goBack() method to have been called', function(){
			BrowserService.init();
			changePage();
			BrowserService.goBack();
			expect(location.url).toHaveBeenCalledWith(oldUrl);
		});

		it('expect getPrevPath() method return old url, after multiple change page events', function(){
			BrowserService.init();
			changePage();
			expect(BrowserService.getPrevPath()).toEqual('/oldUrl/');
		});

		it('just for getPrevState function', function(){
			BrowserService.init();
			changePage();
			expect(BrowserService.getPrevState()).toEqual(null);
		});

		it('getCurrentQueryString returns query string params before and after hashbang', function(){
			expect(BrowserService.getQueryParams()).toEqual([
				hello: 'world'				
			]);
		});

		it('addQueryParams add a new query param to current URL', function(){
			expect(BrowserService.addQueryParams({
				venus: 'mercury'
			})).toEqual('http://www.google.com/#!/category?venus=mercury&hello=world');
		});

		it('addQueryParams add a new query param to clean URL passed to method', function(){
			expect(BrowserService.addQueryParams({
				venus: 'mercury'
			}, 'http://www.bing.com')).toEqual('http://www.bing.com?venus=mercury');
		});

		it('addQueryParams add a new query param to URL passed to method', function(){
			expect(BrowserService.addQueryParams({
				venus: 'mercury'
			}, 'http://www.bing.com?jupiter=saturn')).toEqual('http://www.bing.com?venus=mercury&jupiter=saturn');
		});

		it('brutalRedirect - location.href changed to url', function(){
			var url = "http://www.google.it";
			BrowserService.brutalRedirect(url);
			expect(WindowProvider.location.href).toEqual(url);
		});

		it('brutalRedirect - location.reload called with true, if user agent contains Safari', function(){
			var url = "http://www.google.it";
			navigator = {
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"
			};
			BrowserService.brutalRedirect(url);
			expect(WindowProvider.location.reload).toHaveBeenCalledWith(true);
		});

		it('brutalRedirect - location.reload not called when user agent contains Chrome', function(){
			var url = "http://www.google.it";
			navigator = {
				userAgent: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
			};
			BrowserService.brutalRedirect(url);
			expect(WindowProvider.location.reload).not.toHaveBeenCalled();
		});

		it('Click and go to have been called without hashbang and tagName A', function(){
			mockedEvent = {
				target: {
					tagName:'A',
					hash: '#!/category?hello=world'
				}
			};
			BrowserService.clickAndGo(mockedEvent);
			expect(mockedLocation.url).toHaveBeenCalledWith('/category?hello=world');
		});

		it('Click and go not to have been called with hashbang', function(){
			mockedEvent = {
				target: {
					tagName:'A',
					hash: '#!/category?hello=world'
				}
			};
			BrowserService.clickAndGo(mockedEvent);
			expect(mockedLocation.url).not.toHaveBeenCalledWith('#!/category?hello=world');
		});

		it('Click and go to have been called with path', function(){
			mockedEvent = {
				target: {
					tagName:'B',
					hash: '#!/category?hello=world'
				},
				path: [{
					tagName:'A',
					hash: '#!/category?hello=world'
				}]
			};
			BrowserService.clickAndGo(mockedEvent);
			expect(mockedLocation.url).toHaveBeenCalledWith('/category?hello=world');
		});

		it('Click and go to have been called without tagname A and path, taking parentElement', function(){
			mockedEvent = {
				target: {
					parentElement: {
						tagName : 'A',
						hash: '#!/category?hello=world'
					},
					tagName:'B',
					hash: '#!/category?hello=world'
				},
			};
			BrowserService.clickAndGo(mockedEvent);
			expect(mockedLocation.url).toHaveBeenCalledWith('/category?hello=world');
		});

		it('Click and go to have been called without tagname A, path and parentElement tagName', function(){
			mockedEvent = {
				target: {
					parentElement: {
						tagName : 'B',
						hash: '#!/category?hello=world'
					},
					tagName:'B',
					hash: '#!/category?hello=world'
				},
			};
			BrowserService.clickAndGo(mockedEvent);
			expect(mockedLocation.url).not.toHaveBeenCalled();
		});

		it('Media query exist and matches ', function(){
			//window is 400px

			if(window && window.matchMedia){
				var match = window.matchMedia("(min-width: 400px)");
			}

			expect(match.matches).toEqual(true);
		});

		it('Media query should not match ', function(){
			//window is 400px width

			if(window && window.matchMedia){
				var match = window.matchMedia("(min-width: 401px)");
			}

			expect(match.matches).toEqual(false);
		});

		it('Media query callback should be called ', function(){
				//window is 400px width
			var mockObj = {
				functionToCall: function(){
					console.log('functionToCall');
				},
				foo : function(mql){
					mql.matches ?  mockObj.functionToCall() : console.log('fuck');
				}
			};
			spyOn(mockObj, 'functionToCall');
			if(window && window.matchMedia){
				BrowserService.mediaMatcher("(min-width: 400px)", mockObj.foo)
			}
			expect(mockObj.functionToCall).toHaveBeenCalled();
		});

		it('Media query callback should not be called ', function(){
			//window is 400px width
			var mockObj = {
				functionToCall: function(){
					console.log('functionToCall');
				},
				foo : function(mql){
					mql.matches ?  functionToCall() : console.log('nothing called');
				}
			};
			spyOn(mockObj, 'functionToCall');
			if(window && window.matchMedia){
				BrowserService.mediaMatcher("(min-width: 500px)", mockObj.foo)
			}
			expect(mockObj.functionToCall).not.toHaveBeenCalled();
		});
	});

});