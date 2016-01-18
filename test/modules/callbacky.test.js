'use strict';

describe('CALLBACKY -', function () {

	// load the controller's module
	beforeEach(module('barney.callbacky'));

	var CallbackyService;
	var fakeMethods, newValue, newValueInfo, logger;

	beforeEach(inject(function (_BarneyCallbacky_) {
		// define fakeMethods methods
		fakeMethods = {
			alert: function(value) {
				newValue = value;
			},
			info: function(value) {
				newValueInfo = value;
			}
		};	

		// define logger methods
		logger = {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		};

		// spy logger.log
		spyOn(logger, 'log');

		// get and init CallbackyService
		CallbackyService = _BarneyCallbacky_;
		CallbackyService.init({
			verbose: true,
			logger: logger
		});
	}));

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

	it('if verbose is true, then init method logs', function(){
		expect(logger.log.calls.count()).toEqual(1);
	});

	it('if verbose is true, then bind method logs key and method', function(){
		var key = 'methodOne';
		var method = function(){ fakeMethods.alert('hello') };
		CallbackyService.bind(key, method);
		CallbackyService.trigger(key);
		expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'bind', key, method);
	});

	it('if verbose is true, then trigger method logs key and args', function(){
		var key = 'methodOne';
		var method = function(val){ fakeMethods.alert(val) };
		var arg = { hello: 'world' };
		CallbackyService.bind(key, method);
		CallbackyService.trigger(key, arg);
		expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'trigger', key, arg);
	});

	it('if verbose is true, then clean method logs key', function(){
		var key = 'methodOne';
		var method = function(){ fakeMethods.alert('hello') };
		CallbackyService.bind(key, method);
		CallbackyService.clean(key);
		expect(logger.log).toHaveBeenCalledWith('BarneyCallbacky', 'clean', key);
	});


});