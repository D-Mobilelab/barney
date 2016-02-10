'use strict';

describe('STORAGE -', function () {

	var StorageService;	

	beforeEach(module('barney'));

	beforeEach(inject(function (_BarneyStorage_) {
		StorageService = _BarneyStorage_;
	}));

	describe('cookie -', function(){
		beforeEach(function() {
			StorageService.init({
				type: 'cookie'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			expect(StorageService.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			StorageService.delete(keyName);
			expect(StorageService.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as localStorage), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'localStorage' });
			expect(StorageService.get(keyName, { type: 'localStorage' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'localStorage' });
			expect(StorageService.get(keyName, { type: 'localStorage' })).toBeUndefined();
		});

		it('if save and get a key (as jsObject), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'jsObject' });
			expect(StorageService.get(keyName, { type: 'jsObject' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'jsObject' });
			expect(StorageService.get(keyName, { type: 'jsObject' })).toBeUndefined();
		});
	});

	describe('localStorage -', function(){
		beforeEach(function() {
			StorageService.init({
				type: 'localStorage'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			expect(StorageService.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			StorageService.delete(keyName);
			expect(StorageService.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as cookie), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'cookie' });
			expect(StorageService.get(keyName, { type: 'cookie' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'cookie' });
			expect(StorageService.get(keyName, { type: 'cookie' })).toBeUndefined();
		});

		it('if save and get a key (as jsObject), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'jsObject' });
			expect(StorageService.get(keyName, { type: 'jsObject' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'jsObject' });
			expect(StorageService.get(keyName, { type: 'jsObject' })).toBeUndefined();
		});

		it('check if local storage is supported', function(){
			expect(StorageService.isLocalStorageSupported()).toBe(true);
		});
	});

	describe('jsObject -', function(){
		beforeEach(function() {
			StorageService.init({
				type: 'jsObject'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			expect(StorageService.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			StorageService.setMultiple(keys);
			expect(StorageService.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue);
			StorageService.delete(keyName);
			expect(StorageService.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as cookie), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'cookie' });
			expect(StorageService.get(keyName, { type: 'cookie' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'cookie' });
			expect(StorageService.get(keyName, { type: 'cookie' })).toBeUndefined();
		});

		it('if save and get a key (as localStorage), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			StorageService.set(keyName, keyValue, { type: 'localStorage' });
			expect(StorageService.get(keyName, { type: 'localStorage' })).toEqual(keyValue);
			StorageService.delete(keyName, { type: 'localStorage' });
			expect(StorageService.get(keyName, { type: 'localStorage' })).toBeUndefined();
		});
	});

	describe('logger -', function(){
		var logger;

		beforeEach(function() {
			logger = {
				log: function(){},
				info: function(){},
				warn: function(){},
				error: function(){}
			};

			spyOn(logger, 'log');

			StorageService.init({
				type: 'cookie',
				logger: logger
			})
		});

		it('init method logs', function(){
			expect(logger.log.calls.count()).toEqual(1);
		});

		it('set method logs key, value and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsObject' };
			StorageService.set(key, value, options);
			expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'set', key, value, options);
		});

		it('get method logs key, value and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsObject' };
			StorageService.set(key, value, options);
			StorageService.get(key, options);
			expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'get', key, value, options);
		});

		it('delete method logs key and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsObject' };
			StorageService.set(key, value, options);
			StorageService.delete(key, options);
			expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'delete', key, options);
		});

		it('setMultiple method logs keys, values and options', function(){
			var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsObject' };
			StorageService.setMultiple(keys, options);
			expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'setMultiple', keys, options);
		});

		it('getMultiple method logs key, value and options', function(){
			var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsObject' };
			StorageService.setMultiple(keys, options);
			StorageService.getMultiple(['hello', 'mars'], options);
			expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'getMultiple', {hello: 'world', mars: 'earth'}, options);
		});
	});

	describe('logger default', function(){
		it('init Storage service logger with true', function(){
			spyOn(console, 'log');
			StorageService.init({
				type: 'cookie',
				logger: true
			});
			var key = 'hello', value = 'world', options = { type: 'jsObject' };
			StorageService.set(key, value, options);
			expect(console.log).toHaveBeenCalledWith('BarneyStorage', 'set', key, value, options);
		});
	});

});