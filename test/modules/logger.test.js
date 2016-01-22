'use strict';

describe('LOGGER -', function () {

	var LoggerService, MockConsole;	

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
		beforeEach(function(){
			
		});

		it('it returns true if logger is enabled', function(){
			LoggerService.init({
				enabled: true
			});
			expect(LoggerService.isEnabled()).toBe(true);
		});

		it('it returns false if logger is not enabled', function(){
			LoggerService.init({
				enabled: true
			});
			expect(LoggerService.isEnabled()).toBe(true);
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

	describe('mix -', function(){
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

	describe('mix 2 -', function(){
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

});