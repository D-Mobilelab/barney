'use strict';

describe('NEWTON -', function () {

	var NewtonService, NewtonMock, logger, defer;	

	beforeEach(function(){
		module('barney');

		inject(function (_BarneyNewton_, $q) {
			NewtonService = _BarneyNewton_;
			defer = $q.defer();
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
					timedEventStop: function(eventName, eventProps){
						NewtonMock.timedEventStop(eventName, eventProps);
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

		NewtonService.customLogin({
			logged: false,
			callback: function(){
				defer.resolve(true);
			}
		})
	});

	describe('trackPage -', function(){
		it('method track a Newton pageview', function(){
			defer.promise.then(function(){
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
		});

		it('method track a GA pageview, logger', function(){
			defer.promise.then(function(){
				NewtonService.trackPage({
					page: '/category',
					title: 'Category Page',
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				});

				expect(logger.log).toHaveBeenCalledWith('BarneyNewton', 'track pageview', {
					page: '/category',
					title: 'Category Page',
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				});
			});
		})
	});

	describe('trackEvent -', function(){
		it('method track a Newton pageview', function(){
			defer.promise.then(function(){
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
		});

		it('method track a GA pageview, logger', function(){
			defer.promise.then(function(){
				NewtonService.trackEvent('bigBang', {
					page: '/category',
					title: 'Category Page',
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				});

				expect(logger.log).toHaveBeenCalledWith('BarneyNewton', 'track event', 'bigBang', {
					page: '/category',
					title: 'Category Page',
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				});
			});
		})
	});

	describe('Heartbeats -', function(){
		it('should start heartbeat', function(){
			defer.promise.then(function(){
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
		});

		it('should stop heartbeat', function(){
			defer.promise.then(function(){
				NewtonService.startHeartbeat('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

	            NewtonService.stopHeartbeat('aTestHeartbeat');

				expect(NewtonMock.timedEventStop).toHaveBeenCalledWith('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });
	        });
		});

		it('should get an heartbeat', function(){
			defer.promise.then(function(){
				NewtonService.startHeartbeat('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

				expect(NewtonService.getSingleHeartbeat('aTestHeartbeat')).toEqual({
					keyWord: 'aTestHeartbeat', 
					properties:{
						category: 'Heartbeat',
		                label: '<test>',
		                valuable: 'No',
		                action: 'No' 
		        }});
		    });
        });

        it('should stop all heartbeat', function(){
        	defer.promise.then(function(){
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

				expect(NewtonService.heartbeatsList()).toEqual({});
			});
        });
	});


});