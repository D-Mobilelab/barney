'use strict';

describe('LOGGER -', function () {

	var LoggerService;	

	beforeEach(function(){
		module('barney.logger');

		inject(function (_BarneyLogger_) {
			LoggerService = _BarneyLogger_;
		});

		spyOn(console, 'log');				
		spyOn(console, 'info');				
		spyOn(console, 'warn');				
		spyOn(console, 'error');				
	});

	describe('isEnabled -', function(){
		it('it returns true if logger is enabled', function(){
			LoggerService.init({
				enabled: true
			});
			expect(LoggerService.isEnabled()).toBe(true);
		});

		it('it returns false if logger is not enabled', function(){
			LoggerService.init({
				enabled: false
			});
			expect(LoggerService.isEnabled()).toBe(false);
		});
	});

	describe('level:log -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				level: 'log' 
			});
		});

		it('logger prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger get configuration ', function(){
			expect(LoggerService.getConfig()).toEqual(
				Object({ enabled: true, log: true, table: true, info: true, warn: true, error: true }));
		});
	});

	describe('level:info -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				level: 'info' 
			});
		});

		it('logger does not prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('level:warn -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				level: 'warn' 
			});
		});

		it('logger does not prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('level:error -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				level: 'error' 
			});
		});

		it('logger does not prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('mix configuration -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				levels: {
					log: false,
					info: true,
					warn: false,
					error: true
				}
			});
		});

		it('logger does not prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log.calls.count()).toEqual(0);
		});

		it('logger does not prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger does not prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn.calls.count()).toEqual(0);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith(['ciao', 'mondo']);
		});
	});

	describe('mix configuration 2 -', function(){
		beforeEach(function(){
			LoggerService.init({
				enabled: true,
				levels: {
					log: true,
					info: false,
					warn: true,
					error: false
				}
			});
		});

		it('logger does not prints log messages', function(){
			LoggerService.log('ciao', 'mondo');
			expect(console.log).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger does not prints info messages', function(){
			LoggerService.info('ciao', 'mondo');
			expect(console.info.calls.count()).toEqual(0);
		});

		it('logger does not prints warn messages', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith(['ciao', 'mondo']);
		});

		it('logger prints error messages', function(){
			LoggerService.error('ciao', 'mondo');
			expect(console.error.calls.count()).toEqual(0);
		});
	});

	describe('emit -', function(){
		var mockEmit;

		beforeEach(function(){
			mockEmit = {
				emit: function(){}
			};

			spyOn(mockEmit, 'emit');

			LoggerService.init({
				enabled: true,
				emit: function(level, args){
					mockEmit.emit(level, args);
				}
			});
		});

		it('emit method has called with log() method', function(){
			LoggerService.log('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('log', ['ciao', 'mondo']);
		});

		it('emit method has called with info() method', function(){
			LoggerService.info('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('info', ['ciao', 'mondo']);
		});

		it('emit method has called with warn() method', function(){
			LoggerService.warn('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('warn', ['ciao', 'mondo']);
		});

		it('emit method has called with error() method', function(){
			LoggerService.error('ciao', 'mondo');
			expect(mockEmit.emit).toHaveBeenCalledWith('error', ['ciao', 'mondo']);
		});
	});

	describe('level failure -', function(){
		it('fail enable init', function(){
			var init = function(){
				LoggerService.init({
					enabled: 134
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					level: [123,124]
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					level: 'piooo'
				});
			};
			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					levels: {
						log:'piooo',
						info: true,
						table: true,
						warn: true,
						error: true
					}
				});
			};

			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					levels: {
						123 : true
					}
				});
			};

			expect(init).toThrow();
		});

		it('fail level init', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					levels: 'i\'m not an object'
				});
			};

			expect(init).toThrow();
		});

		it('fail level init with emit', function(){
			var init = function(){
				LoggerService.init({
					enabled: true,
					level: 'log',
					emit: 'i\'m not a function'
				});
			};
			expect(init).toThrow();
		});
	});

});