'use strict';

describe('NEWTON -', function () {

	describe('VANILLA - ', function(){
		
		var NewtonMock, logger;

		beforeEach(function(){
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

			barney.Newton.init({
				enabled: true,
				verbose: true,
				logger: logger
			});
		});

		describe('trackPage -', function(){
			it('method track a Newton pageview', function(){
				barney.Newton.trackPage({
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
				barney.Newton.trackPage({
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
				barney.Newton.trackEvent('bigBang', {
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
				barney.Newton.trackEvent('bigBang', {
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
				barney.Newton.startHeartbeat('aTestHeartbeat', {
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
				barney.Newton.startHeartbeat('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

	            barney.Newton.stopHeartbeat('aTestHeartbeat');

				expect(NewtonMock.timedEventStop).toHaveBeenCalledWith('aTestHeartbeat');
			});

			it('should get an heartbeat', function(){
				barney.Newton.startHeartbeat('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

				expect(barney.Newton.isHeartbeatEnabled('aTestHeartbeat')).toEqual(true);
	        });

	        it('should stop all heartbeat', function(){
				barney.Newton.startHeartbeat('aTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

	            barney.Newton.startHeartbeat('aSecondTestHeartbeat', {
	                category: 'Heartbeat',
	                label: '<test>',
	                valuable: 'No',
	                action: 'No',
	            });

	            barney.Newton.stopAllHeartbeat();

				expect(barney.Newton.heartbeatsList()).toEqual({aTestHeartbeat:false, aSecondTestHeartbeat:false});
	        });
		});

	});

	describe('ANGULAR - ', function(){
		
		var NewtonService;

		beforeEach(function(){
			module('barney');

			inject(function (_BarneyNewton_) {
				NewtonService = _BarneyNewton_;
			});

			spyOn(barney.Newton, 'init');
			spyOn(barney.Newton, 'trackPage');
			spyOn(barney.Newton, 'trackEvent');
			spyOn(barney.Newton, 'startHeartbeat');
			spyOn(barney.Newton, 'stopHeartbeat');
			spyOn(barney.Newton, 'stopAllHeartbeat');
			spyOn(barney.Newton, 'heartbeatsList');
			spyOn(barney.Newton, 'isHeartbeatEnabled');
		});

		it('angular init() calls vanilla init() -', function(){
			var options = {
				verbose: true,
				enabled: true,
				logger: {
					log: function(){},
					info: function(){},
					warn: function(){},
					error: function(){}
				}
			};
			NewtonService.init(options);
			expect(barney.Newton.init).toHaveBeenCalledWith(options);
		});

		it('angular trackPage() calls vanilla trackPage() -', function(){
			var options = {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			};
			NewtonService.trackPage(options);
			expect(barney.Newton.trackPage).toHaveBeenCalledWith(options);
		});

		it('angular trackEvent() calls vanilla trackEvent() -', function(){
			var options = {
				page: '/category',
				title: 'Category Page',
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			};
			NewtonService.trackEvent('bigBang', options);
			expect(barney.Newton.trackEvent).toHaveBeenCalledWith('bigBang', options);
		});

		it('angular startHeartbeat() calls vanilla startHeartbeat() -', function(){
			var options = {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            };
			NewtonService.startHeartbeat('heartbeatNew', options);
			expect(barney.Newton.startHeartbeat).toHaveBeenCalledWith('heartbeatNew', options);
		});

		it('angular stopHeartbeat() calls vanilla stopHeartbeat() -', function(){
			var options = {
                category: 'Heartbeat',
                label: '<test>',
                valuable: 'No',
                action: 'No',
            };
			NewtonService.stopHeartbeat('heartbeatNew', options);
			expect(barney.Newton.stopHeartbeat).toHaveBeenCalledWith('heartbeatNew', options);
		});

		it('angular stopAllHeartbeat() calls vanilla stopAllHeartbeat() -', function(){
			NewtonService.stopAllHeartbeat();
			expect(barney.Newton.stopAllHeartbeat).toHaveBeenCalled();
		});

		it('angular heartbeatsList() calls vanilla heartbeatsList() -', function(){
			NewtonService.heartbeatsList();
			expect(barney.Newton.heartbeatsList).toHaveBeenCalled();
		});
		it('angular isHeartbeatEnabled() calls vanilla isHeartbeatEnabled() -', function(){
			var name = 'heartbeatNew';
			NewtonService.isHeartbeatEnabled(name);
			expect(barney.Newton.isHeartbeatEnabled).toHaveBeenCalledWith(name);
		});


	});

	

});