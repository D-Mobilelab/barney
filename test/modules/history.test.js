'use strict';

describe('HISTORY -', function () {

	var HistoryService;
	var $rootScope;
	var changePageEvent;
	var newUrl = '#!/newUrl/';
	var oldUrl = '#!/oldUrl/';

	beforeEach(function(){
		module('barney.history');

		inject(function (_$rootScope_, _BarneyHistory_) {
			$rootScope = _$rootScope_;
			HistoryService = _BarneyHistory_;
		});

		spyOn($rootScope, "$on").and.callFake(function(stringa, method) {
			changePageEvent = function(){
				console.log('changePageEvent', method);
				method.call(null, newUrl, oldUrl);
			}	    	
	    });
	});


	describe('Init method - ', function(){
		it('expect $rootScope.$on has been called', function(){
			HistoryService.init();
			expect($rootScope.$on).toHaveBeenCalled();
		});

		xit('expect get() method return old url, after change page event', function(){
			HistoryService.init();
			changePageEvent();
			expect(HistoryService.get()).toEqual(oldUrl);
		});

		xit('expect get() method return old url, after multiple change page events', function(){
			HistoryService.init();
			changePageEvent();
			expect(HistoryService.get()).toEqual(oldUrl);
			// cambiare oldurl
			changePageEvent();
			expect(HistoryService.get()).toEqual(oldUrl);
		});
	});

});