'use strict';

describe('CONFIG -', function () {

	// load the controller's module
	beforeEach(module('barney.config'));

	var ConfigProvider;

	beforeEach(inject(function (_BarneyConfig_) {
		ConfigProvider = _BarneyConfig_;
		ConfigProvider.init({
			config: CONFIG
		});
	}));

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

	it('if key value is true, then return true', function () {
		expect(ConfigProvider.get('KEY_TRUE')).toBe(true);
	});

	it('if key value is a string, then return it', function () {
		expect(ConfigProvider.get('KEY_VALUE')).toBe(CONFIG.KEY_VALUE);
	});

	it('if you use a lowercase key, then return the value of uppercase key', function () {
		expect(ConfigProvider.get('key_value')).toBe(CONFIG.KEY_VALUE);
	});

	it('if you ask the list of config keys, then return it', function () {
		expect(ConfigProvider.list()).toBe(CONFIG);
	});

});