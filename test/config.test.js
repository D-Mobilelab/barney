'use strict';

describe('CONFIG -', function () {

	// load the controller's module
	beforeEach(module('barney'));

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

	it('if you use a lowercase key (and set upperCase: true) then return the value of uppercase key', function () {
		ConfigProvider.init({
			config: CONFIG,
			upperCase: true
		});
		expect(ConfigProvider.get('key_value')).toBe(CONFIG.KEY_VALUE);
	});	

	it('if you use a lowercase key (and don\'t set upperCase), then return the value of lowercase key', function () {
		expect(ConfigProvider.get('lowercase_key')).toBe(CONFIG.lowercase_key);
	});	

	it('if you ask a nested key, then return it', function () {
		expect(ConfigProvider.get('GRANDFATHER.FATHER.SON')).toBe(CONFIG.GRANDFATHER.FATHER.SON);
	});

	it('if you ask a nested void key, then return it', function () {
		expect(ConfigProvider.get('GRANDFATHER.MOTHER.SON')).toBe(undefined);
	});


	it('if you ask the list of config keys, then return it', function () {
		expect(ConfigProvider.list()).toBe(CONFIG);
	});

	it('if a key value is false applied to a filter, then return false ', inject(function ($filter) {
		expect($filter('config')('KEY_FALSE')).toBe(false);
	}));

	it('if a key value has a value applied to a filter, then return that value', inject(function ($filter) {
		expect($filter('config')('NEWTON_SECRET_KEY')).toBe('<sec_ret>');
	}));
});