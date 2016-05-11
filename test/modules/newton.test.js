'use strict';

describe('NEWTON -', function () {

	var NewtonService, NewtonMock, logger;	

	beforeEach(function(){
		module('barney');

		inject(function (_BarneyNewton_) {
			NewtonService = _BarneyNewton_;
		});

		logger = {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		};

		NewtonMock = {
			sendEvent: function() {},
			timedEventStart: function() {},
			timedEventStop: function() {}
		};

		window.Newton = {
			getSharedInstance: function(){
				return {
					sendEvent: function(eventName, eventProps){
						NewtonMock.sendEvent(eventName, eventProps);
					},
					timedEventStart: function(eventName, eventProps){
						NewtonMock.timedEventStart(eventName, eventProps);
					},
					timedEventStop: function(eventName){
						NewtonMock.timedEventStop(eventName);
					}
				}
			},
			SimpleObject: {
				fromJSONObject: function(object){
					return object;
				}
			}
		}

		spyOn(logger, 'log');
		spyOn(NewtonMock, 'sendEvent');
		spyOn(NewtonMock, 'timedEventStart');
		spyOn(NewtonMock, 'timedEventStop');

		NewtonService.init({
			enabled: true,
			verbose: true,
			logger: logger
		})
	});

	describe('trackPage -', function(){
		it('method track a Newton pageview', function(){
			NewtonService.trackPage({
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});

			expect(NewtonMock.sendEvent).toHaveBeenCalledWith('pageview', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});
		});

		it('method track a GA pageview, logger', function(){
			NewtonService.trackPage({
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});

			expect(logger.log).toHaveBeenCalledWith('BarneyNewton', 'track', 'pageview', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});
		})
	});

	describe('trackEvent -', function(){
		it('method track a Newton pageview', function(){
			NewtonService.trackEvent('bigBang', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});

			expect(NewtonMock.sendEvent).toHaveBeenCalledWith('bigBang', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});
		});

		it('method track a GA pageview, logger', function(){
			NewtonService.trackEvent('bigBang', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});

			expect(logger.log).toHaveBeenCalledWith('BarneyNewton', 'track', 'bigBang', {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			});
		})
	});

	describe('Heartbeats -', function(){
		it('should start heartbeat', function(){
			NewtonService.startHeartbeat('aTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });

			expect(NewtonMock.timedEventStart).toHaveBeenCalledWith('aTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });
		});

		it('should stop heartbeat', function(){
			NewtonService.startHeartbeat('aTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });

            NewtonService.stopHeartbeat('aTestHeartbeat');

			expect(NewtonMock.timedEventStop).toHaveBeenCalledWith('aTestHeartbeat');
		});

		it('should get an heartbeat', function(){
			NewtonService.startHeartbeat('aTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });

			expect(NewtonService.getSingleHeartbeat('aTestHeartbeat')).toEqual(true);
        });

        it('should stop all heartbeat', function(){
			NewtonService.startHeartbeat('aTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });

            NewtonService.startHeartbeat('aSecondTestHeartbeat', {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            });

            NewtonService.stopAllHeartbeat();

			expect(NewtonService.heartbeatsList()).toEqual({aTestHeartbeat:false, aSecondTestHeartbeat:false});
        });
	});

});