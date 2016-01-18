'use strict';

describe('CALLBACKY -', function () {

	var CallbackyService;	

	beforeEach(module('barney.callbacky'));

	beforeEach(inject(function (_BarneyCallbacky_) {
		CallbackyService = _BarneyCallbacky_;
	}));

	describe('main -', function () {
		var newValue, newValueInfo, fakeMethods;

		beforeEach(function() {
			fakeMethods = {
				alert: function(value) {
					newValue = value;
				},
				info: function(value) {
					newValueInfo = value;
				}
			};

			CallbackyService.init();
		});

		it('if bind a function with a key and trigger the same key, then that function is called', function(){
			spyOn(fakeMethods, 'alert');
			CallbackyService.bind('methodOne', function(){ fakeMethods.alert('hello') });
			CallbackyService.trigger('methodOne');
			expect(fakeMethods.alert).toHaveBeenCalled();
		});

		it('if bind a function with a key and trigger the same key, then that function is called (DEPTH TEST)', function(){
			CallbackyService.bind('methodOne', function(){ fakeMethods.alert('hello') });
			CallbackyService.trigger('methodOne');
			expect(newValue).toEqual('hello');
		});

		it('if bind a function with a key and trigger the same key with args, then that function is called with args', function(){
			spyOn(fakeMethods, 'alert');
			CallbackyService.bind('methodOne', function(val){ fakeMethods.alert(val) });
			CallbackyService.trigger('methodOne', 'world');
			expect(fakeMethods.alert).toHaveBeenCalledWith('world');
		});

		it('if bind a function with a key and trigger the same key with args, then that function is called with args (DEPTH TEST)', function(){
			CallbackyService.bind('methodOne', function(val){ fakeMethods.alert(val) });
			CallbackyService.trigger('methodOne', 'world');
			expect(newValue).toEqual('world');
		});

		it('if bind many function with a key and trigger the same key, then these functions are called', function(){
			spyOn(fakeMethods, 'alert');
			spyOn(fakeMethods, 'info');
			CallbackyService.bind('methodOne', function(){ fakeMethods.alert('hello') });
			CallbackyService.bind('methodOne', function(){ fakeMethods.info('hello') });
			CallbackyService.trigger('methodOne');
			expect(fakeMethods.alert).toHaveBeenCalled();
			expect(fakeMethods.info).toHaveBeenCalled();
		});

		it('if bind many function with a key and trigger the same key with args, then these functions are called with args', function(){
			spyOn(fakeMethods, 'alert');
			spyOn(fakeMethods, 'info');
			CallbackyService.bind('methodOne', function(val){ fakeMethods.alert(val) });
			CallbackyService.bind('methodOne', function(val){ fakeMethods.info(val) });
			CallbackyService.trigger('methodOne', 'hello');
			CallbackyService.trigger('methodOne', 'world');
			expect(fakeMethods.alert).toHaveBeenCalledWith('hello');
			expect(fakeMethods.alert).toHaveBeenCalledWith('world');
		});

		it('if bind a function with a key, clean that key and trigger the same key, then that functions is not called', function(){
			spyOn(fakeMethods, 'alert');
			CallbackyService.bind('methodOne', function(){ fakeMethods.alert('hello') });
			CallbackyService.clean('methodOne');
			CallbackyService.trigger('methodOne');
			expect(fakeMethods.alert.calls.count()).toEqual(0);
		});
	});

	describe('logger -', function () {
		var logger;

		beforeEach(function() {
			logger = {
				log: function(){},
				info: function(){},
				warn: function(){},
				error: function(){}
			};

			spyOn(logger, 'log');
		});

		describe('if verbose is true, ', function(){
			beforeEach(function() {
				CallbackyService.init({
					verbose: true,
					logger: logger
				});
			});

			it('then init method logs', function(){
				expect(logger.log.calls.count()).toEqual(1);
			});

			it('then bind method logs key and method', function(){
				var key = 'methodOne';
				var method = function(){ var a = 3; };
				CallbackyService.bind(key, method);
				CallbackyService.trigger(key);
				expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'bind', key, method);
			});

			it('then trigger method logs key and args', function(){
				var key = 'methodOne';
				var method = function(val){ var a = val; };
				var arg = { hello: 'world' };
				CallbackyService.bind(key, method);
				CallbackyService.trigger(key, arg);
				expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'trigger', key, arg);
			});

			it('then clean method logs key', function(){
				var key = 'methodOne';
				var method = function(){ var a = 3; };
				CallbackyService.bind(key, method);
				CallbackyService.clean(key);
				expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'clean', key);
			});
		});

		describe('if verbose is false,', function(){
			beforeEach(function() {
				CallbackyService.init({
					verbose: false
				});
			});

			it('then init method does not logs', function(){
				expect(logger.log.calls.count()).toEqual(0);
			});

			it('then bind method does not logs', function(){
				var key = 'methodOne';
				var method = function(){ var a = 3; };
				CallbackyService.bind(key, method);
				CallbackyService.trigger(key);
				expect(logger.log.calls.count()).toEqual(0);
			});

			it('then trigger method does not logs', function(){
				var key = 'methodOne';
				var method = function(val){ var a = val; };
				var arg = { hello: 'world' };
				CallbackyService.bind(key, method);
				CallbackyService.trigger(key, arg);
				expect(logger.log.calls.count()).toEqual(0);
			});

			it('then clean method does not logs', function(){
				var key = 'methodOne';
				var method = function(){ var a = 3; };
				CallbackyService.bind(key, method);
				CallbackyService.clean(key);
				expect(logger.log.calls.count()).toEqual(0);
			});
		});
		
	});

});