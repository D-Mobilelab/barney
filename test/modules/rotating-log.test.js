'use strict';

describe('LOGGER -', function () {

	var RotLogger, MockConsole;	

	beforeEach(function(){
		module('barney.logger');

		inject(function (_BarneyRotatingLogger_) {
			RotLogger = _BarneyRotatingLogger_;
		});

		spyOn(console, 'log');				
		spyOn(console, 'info');				
		spyOn(console, 'warn');				
		spyOn(console, 'error');				
	});

	describe('rotating logger -', function(){
		beforeEach(function(){
			RotLogger.init({
				enabled: true,
				recordingEnabled: false
			});
		});

		it('logger prints log messages', function(){
			RotLogger.log('ciao', 'mondo');
			expect(console.log).toHaveBeenCalledWith([['ciao', 'mondo']]);
		});

		it('logger prints info messages', function(){
			RotLogger.info('ciao', 'mondo');
			expect(console.info).toHaveBeenCalledWith([['ciao', 'mondo']]);
		});

		it('logger prints warn messages', function(){
			RotLogger.warn('ciao', 'mondo');
			expect(console.warn).toHaveBeenCalledWith([['ciao', 'mondo']]);
		});

		it('logger prints error messages', function(){
			RotLogger.error('ciao', 'mondo');
			expect(console.error).toHaveBeenCalledWith([['ciao', 'mondo']]);
		});
	});

	describe('rotating without sliding -', function(){
		var MockSave;

		beforeEach(function(){
			MockSave = {
				save: function(){}
			};

			spyOn(MockSave, 'save');

			RotLogger.init({
				enabled: true,
				recordingEnabled: true,
				maxSize: 5,
				sliding: false,
				saveRecords: function(messages){
					MockSave.save(messages);
				}
			});
		});

		it('saveRecords has not been called automatically before maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			expect(MockSave.save.calls.count()).toEqual(0);
		});

		it('saveRecords has been called automatically after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			expect(MockSave.save.calls.count()).toEqual(1);
		});

		it('saveRecords has been called automatically many times, after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			RotLogger.log(7);
			RotLogger.log(8);
			RotLogger.log(9);
			RotLogger.log(10);
			RotLogger.log(11);
			expect(MockSave.save.calls.count()).toEqual(2);
		});

		it('endRecording calls saveRecords', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.endRecording();
			expect(MockSave.save.calls.count()).toEqual(1);
		});
	});

	describe('rotating with sliding -', function(){
		var MockSave;

		beforeEach(function(){
			MockSave = {
				save: function(){}
			};

			spyOn(MockSave, 'save');

			RotLogger.init({
				enabled: true,
				recordingEnabled: true,
				maxSize: 5,
				sliding: true,
				saveRecords: function(messages){
					MockSave.save(messages);
				}
			});
		});

		it('saveRecords has not been called automatically after maxSize logs', function(){
			RotLogger.startRecording(true);
			RotLogger.log(1);
			RotLogger.log(2);
			RotLogger.log(3);
			RotLogger.log(4);
			RotLogger.log(5);
			RotLogger.log(6);
			expect(MockSave.save.calls.count()).toEqual(0);
		});
	});

});