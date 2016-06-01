'use strict';

describe('STORAGE -', function () {

	describe('VANILLA - ', function(){
		describe('cookie -', function(){
			beforeEach(function() {
				barney.Storage.init({
					type: 'cookie'
				})
			});

			it('if save and get a key, it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				expect(barney.Storage.get(keyName)).toEqual(keyValue);
			});

			it('if save and get multiple keys, it returns saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
			});	

			it('if save and get all keys, it returns all saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple()).toEqual(keys);
			});

			it('if save, delete and get a key, it returns undefined', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				barney.Storage.delete(keyName);
				expect(barney.Storage.get(keyName)).toBeUndefined();
			});	

			it('if save and get a key (as localStorage), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'localStorage' });
				expect(barney.Storage.get(keyName, { type: 'localStorage' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'localStorage' });
				expect(barney.Storage.get(keyName, { type: 'localStorage' })).toBeUndefined();
			});

			it('if save and get a key (as jsObject), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'jsObject' });
				expect(barney.Storage.get(keyName, { type: 'jsObject' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'jsObject' });
				expect(barney.Storage.get(keyName, { type: 'jsObject' })).toBeUndefined();
			});
		});

		describe('localStorage -', function(){
			beforeEach(function() {
				barney.Storage.init({
					type: 'localStorage'
				})
			});

			it('if save and get a key, it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				expect(barney.Storage.get(keyName)).toEqual(keyValue);
			});

			it('if save and get multiple keys, it returns saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
			});	

			it('if save and get all keys, it returns all saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple()).toEqual(keys);
			});

			it('if save, delete and get a key, it returns undefined', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				barney.Storage.delete(keyName);
				expect(barney.Storage.get(keyName)).toBeUndefined();
			});	

			it('if save and get a key (as cookie), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'cookie' });
				expect(barney.Storage.get(keyName, { type: 'cookie' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'cookie' });
				expect(barney.Storage.get(keyName, { type: 'cookie' })).toBeUndefined();
			});

			it('if save and get a key (as jsObject), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'jsObject' });
				expect(barney.Storage.get(keyName, { type: 'jsObject' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'jsObject' });
				expect(barney.Storage.get(keyName, { type: 'jsObject' })).toBeUndefined();
			});

			it('check if local storage is supported', function(){
				expect(barney.Storage.isLocalStorageSupported()).toBe(true);
			});
		});

		describe('jsObject -', function(){
			beforeEach(function() {
				barney.Storage.init({
					type: 'jsObject'
				})
			});

			it('if save and get a key, it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				expect(barney.Storage.get(keyName)).toEqual(keyValue);
			});

			it('if save and get multiple keys, it returns saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
			});	

			it('if save and get all keys, it returns all saved keys', function(){
				var keys = { hello: 'world', mars: 'earth' };
				barney.Storage.setMultiple(keys);
				expect(barney.Storage.getMultiple()).toEqual(keys);
			});

			it('if save, delete and get a key, it returns undefined', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue);
				barney.Storage.delete(keyName);
				expect(barney.Storage.get(keyName)).toBeUndefined();
			});	

			it('if save and get a key (as cookie), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'cookie' });
				expect(barney.Storage.get(keyName, { type: 'cookie' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'cookie' });
				expect(barney.Storage.get(keyName, { type: 'cookie' })).toBeUndefined();
			});

			it('if save and get a key (as localStorage), it returns saved key', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				barney.Storage.set(keyName, keyValue, { type: 'localStorage' });
				expect(barney.Storage.get(keyName, { type: 'localStorage' })).toEqual(keyValue);
				barney.Storage.delete(keyName, { type: 'localStorage' });
				expect(barney.Storage.get(keyName, { type: 'localStorage' })).toBeUndefined();
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

				barney.Storage.init({
					type: 'cookie',
					logger: logger
				})
			});

			it('init method logs', function(){
				expect(logger.log.calls.count()).toEqual(1);
			});

			it('set method logs key, value and options', function(){
				var key = 'hello', value = 'world', options = { type: 'jsObject' };
				barney.Storage.set(key, value, options);
				expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'set', key, value, options);
			});

			it('get method logs key, value and options', function(){
				var key = 'hello', value = 'world', options = { type: 'jsObject' };
				barney.Storage.set(key, value, options);
				barney.Storage.get(key, options);
				expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'get', key, value, options);
			});

			it('delete method logs key and options', function(){
				var key = 'hello', value = 'world', options = { type: 'jsObject' };
				barney.Storage.set(key, value, options);
				barney.Storage.delete(key, options);
				expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'delete', key, options);
			});

			it('setMultiple method logs keys, values and options', function(){
				var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsObject' };
				barney.Storage.setMultiple(keys, options);
				expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'setMultiple', keys, options);
			});

			it('getMultiple method logs key, value and options', function(){
				var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsObject' };
				barney.Storage.setMultiple(keys, options);
				barney.Storage.getMultiple(['hello', 'mars'], options);
				expect(logger.log).toHaveBeenCalledWith('BarneyStorage', 'getMultiple', {hello: 'world', mars: 'earth'}, options);
			});
		});

		describe('logger default', function(){
			it('init Storage service logger with true', function(){
				spyOn(console, 'log');
				barney.Storage.init({
					type: 'cookie',
					logger: true
				});
				var key = 'hello', value = 'world', options = { type: 'jsObject' };
				barney.Storage.set(key, value, options);
				expect(console.log).toHaveBeenCalledWith('BarneyStorage', 'set', key, value, options);
			});
		});
	});

	describe('ANGULAR - ', function(){

		var StorageService;	

		beforeEach(module('barney'));

		beforeEach(inject(function (_BarneyStorage_) {
			StorageService = _BarneyStorage_;

			spyOn(barney.Storage, 'init');
			spyOn(barney.Storage, 'delete');
			spyOn(barney.Storage, 'get');
			spyOn(barney.Storage, 'set');
			spyOn(barney.Storage, 'setMultiple');
			spyOn(barney.Storage, 'getMultiple');
			spyOn(barney.Storage, 'isLocalStorageSupported');
		}));

		describe('cookie -', function(){
			beforeEach(function() {
				StorageService.init({
					type: 'cookie'
				})
			});

			it('angular set calls vanilla set', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				StorageService.set(keyName, keyValue);
				expect(barney.Storage.set).toHaveBeenCalledWith(keyName, keyValue, undefined);
			});

			it('angular get calls vanilla get', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				StorageService.set(keyName, keyValue);
				console.log(StorageService.get(keyName));
				expect(barney.Storage.get).toHaveBeenCalledWith(keyName, undefined);
			});

			it('angular setMultiple call vanilla setMultiple', function(){
				var keys = { hello: 'world', mars: 'earth' };
				StorageService.setMultiple(keys);
				expect(barney.Storage.setMultiple).toHaveBeenCalledWith(keys, undefined);
			});	

			it('angular getMultiple calls vanilla getMultiple', function(){
				var keys = { hello: 'world', mars: 'earth' };
				StorageService.setMultiple(keys);
				console.log(StorageService.getMultiple());
				expect(barney.Storage.getMultiple).toHaveBeenCalled();
			});

			it('angular delete calls vanilla delete', function(){
				var keyName = 'hello';
				var keyValue = 'world';
				StorageService.set(keyName, keyValue);
				StorageService.delete(keyName);
				expect(barney.Storage.delete).toHaveBeenCalledWith(keyName, undefined);
			});	

			it('angular isLocalStorageSupported calls vannilla isLocalStorageSupported', function(){
				console.log(StorageService.isLocalStorageSupported());
				expect(barney.Storage.isLocalStorageSupported).toHaveBeenCalled();
			});

			it('if save and get a key (as jsObject), it returns saved key', function(){
				var obj = {
					type: 'cookie'
				};

				StorageService.init(obj);
				expect(barney.Storage.init).toHaveBeenCalledWith(obj);
			});
		});
	});

});