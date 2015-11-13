'use strict';

describe('CONFIG', function () {

	// load the controller's module
	beforeEach(module('barney.config'));

	var ConfigProvider, scope;

	beforeEach(inject(function (_BarneyConfig_) {
		ConfigProvider = _BarneyConfig_;
	}));

	// Initialize the controller and a mock scope
	// beforeEach(inject(function ($controller, $rootScope) {
	// 	scope = $rootScope.$new();
	// 	HomepageCtrl = $controller('HomepageCtrl', {
	// 		$scope: scope
	// 	});
	// }));

	it('if key value is a void string, then return false', function () {
		expect(ConfigProvider.get('KEY_VOID_STRING')).toBe(false);
	});

	it('if key value is 0, then return false', function () {
		expect(ConfigProvider.get('KEY_ZERO')).toBe(false);
	});
	
	it('if key value is "0", then return false', function () {
		expect(ConfigProvider.get('KEY_ZERO_STRING')).toBe(false);
	});
	
	it('if key value is null, then return false', function () {
		expect(ConfigProvider.get('KEY_NULL')).toBe(false);
	});
	
	it('if key value is "null", then return false', function () {
		expect(ConfigProvider.get('KEY_NULL_STRING')).toBe(false);
	});
	
	it('if key value is false, then return false', function () {
		expect(ConfigProvider.get('KEY_FALSE')).toBe(false);
	});

	it('if key value is "false", then return false', function () {
		expect(ConfigProvider.get('KEY_FALSE_STRING')).toBe(false);
	});

});