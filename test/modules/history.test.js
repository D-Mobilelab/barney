'use strict';

describe('HISTORY -', function () {

	var HistoryService;
	var $rootScope;
	var changePageEvent;
	var newUrl = '#!/newUrl/';
	var oldUrl = '#!/oldUrl/';

	var location;

	beforeEach(function(){
		module('barney.history');

		inject(function (_$rootScope_, _BarneyHistory_, _$location_) {
			$rootScope = _$rootScope_;
			HistoryService = _BarneyHistory_;
			location = _$location_;
		});

		spyOn($rootScope, "$on").and.callFake(function(stringa, method) {
			changePageEvent = function(){
				method.call(null, null, newUrl, oldUrl);
			}	    	
	    });

	     spyOn(location, 'url');

	});


	describe('Init method - ', function(){
		it('expect $rootScope.$on has been called', function(){
			HistoryService.init();
			expect($rootScope.$on).toHaveBeenCalled();
		});

		it('expect get() method return old url, after change page event', function(){
			HistoryService.init();
			changePageEvent();
			expect(HistoryService.get()).toEqual('/oldUrl/');
		});

		it('expect get() method return old url, after multiple change page events', function(){
			HistoryService.init();
			changePageEvent();
			oldUrl = newUrl;
			newUrl = '#!/newUrl2/'
			changePageEvent();
			expect(HistoryService.get()).toEqual('/newUrl/');
		});

		it('should redirect to previus url', function(){
			HistoryService.init();
			changePageEvent();
			HistoryService.goBack()
			expect(location.url).toHaveBeenCalledWith('/newUrl/');
		});
	});

});