'use strict';

describe('HISTORY -', function () {

	var HistoryService;
	var $rootScope;
	var newUrl = '#!/newUrl/';
	var oldUrl = '#!/oldUrl/';

	beforeEach(function(){
		module('barney.history');

		inject(function (_$rootScope_, _BarneyHistory_) {
			$rootScope = _$rootScope_;
			HistoryService = _BarneyHistory_;
		});

		spyOn($rootScope, "$on").and.callFake(function(stringa, method) {
	    	method.call(null, newUrl, oldUrl);
	    });
	});


	//describe('Init method - ', function(){
		it('it save the last visited page', function(){
			HistoryService.init();
			expect($rootScope.$on).toHaveBeenCalled();
		});
	//});

});