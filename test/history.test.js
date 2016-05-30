'use strict';

describe('HISTORY -', function () {

	var HistoryService;
	var HistoryMock;
	var $rootScope;
	var changePageEvent;
	var newUrl = '#!/newUrl/';	
	var oldUrl = '#!/oldUrl/';

	var location;

	var changePage = function(){
    	location.url(oldUrl);
		location.url(newUrl);
    }

	beforeEach(function(){
		module('barney');

		inject(function (_$rootScope_, _BarneyHistory_, _$location_) {
			$rootScope = _$rootScope_;
			HistoryService = _BarneyHistory_;
			location = _$location_;
		});

		location = {
			url: function(){}
		}

		spyOn($rootScope, "$on").and.callFake(function(stringa, method) {
			//changePageEvent = function(){
				method.call(null, null, newUrl, oldUrl);
			//}	    	

	    });

	    spyOn(location, 'url');
	});


	describe('Init method - ', function(){
		it('expect $rootScope.$on has been called', function(){
			HistoryService.init();
			expect($rootScope.$on).toHaveBeenCalled();
		});

		it('expect goBack() method to have been called', function(){
			HistoryService.init();
			changePage();
			HistoryService.goBack();
			expect(location.url).toHaveBeenCalledWith(oldUrl);
		});

		it('expect getPrevPath() method return old url, after multiple change page events', function(){
			HistoryService.init();
			changePage();
			expect(HistoryService.getPrevPath()).toEqual('/oldUrl/');
		});

		it('just for getPrevState function', function(){
			HistoryService.init();
			changePage();
			expect(HistoryService.getPrevState()).toEqual(null);
		});
	});

});