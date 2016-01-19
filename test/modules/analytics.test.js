'use strict';

describe('ANALYTICS -', function () {

	var AnalyticsService, dimensions, logger;	

	beforeEach(function(){
		module('barney.analytics');

		inject(function (_BarneyAnalytics_) {
			AnalyticsService = _BarneyAnalytics_;
		});

		dimensions = {
			dimensionOne: 1,
			dimensionFour: 4
		};

		logger = {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		};

		window.ga = function(){};

		spyOn(logger, 'log');
		spyOn(window, 'ga');

		AnalyticsService.init({
			dimensions: dimensions,
			enabled: true,
			verbose: true,
			logger: logger
		})
	});

	describe('setId -', function(){
		it('method set GA user id', function(){
			var id = 123456789;
			AnalyticsService.setId(id);
			expect(window.ga).toHaveBeenCalledWith('set', '&uid', id);
		});

		it('method does not set GA user id, if id is missing', function(){
			var id = undefined;
			AnalyticsService.setId(id);
			expect(window.ga.calls.count()).toEqual(0);
		});

		it('method set GA user id, logger', function(){
			var id = 123456789;
			AnalyticsService.setId(id);
			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'set id', id);
		});
	});

	describe('setDimension -', function(){
		it('method set a single GA dimension', function(){
			var newDimensions = { dimensionOne: 'logged' };
			AnalyticsService.setDimension(newDimensions);
			expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 1, 'logged');
		});

		it('method set multiple GA dimensions', function(){
			var newDimensions = { dimensionOne: 'logged', dimensionFour: 'premium' };
			AnalyticsService.setDimension(newDimensions);
			expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 1, 'logged');
			expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 4, 'premium');
		});

		it('method set a single GA dimension, logger', function(){
			var newDimensions = { dimensionOne: 'logged' };
			AnalyticsService.setDimension(newDimensions);
			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'set dimension', 1, 'logged');
		});

		it('method set multiple GA dimensions, logger', function(){
			var newDimensions = { dimensionOne: 'logged', dimensionFour: 'premium' };
			AnalyticsService.setDimension(newDimensions);
			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'set dimension', 1, 'logged');
			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'set dimension', 4, 'premium');
		});

		it('method does not set a GA dimensions, if dimension is empty', function(){
			var newDimensions = {};
			AnalyticsService.setDimension(newDimensions);
			expect(window.ga.calls.count()).toEqual(0);
		});
	});

	describe('trackPage -', function(){
		it('method track a GA pageview', function(){
			AnalyticsService.trackPage({
				page: '/category',
				title: 'Category Page',
				dimensions: {
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				}
			});

			expect(window.ga).toHaveBeenCalledWith('send', {
				hitType: 'pageview',
				page: '/category',
				title: 'Category Page',
				dimension1: 'logged',
				dimension4: 'premium'
			});
		});

		it('method track a GA pageview, logger', function(){
			AnalyticsService.trackPage({
				page: '/category',
				title: 'Category Page',
				dimensions: {
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				}
			});

			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'track pageview', {
				hitType: 'pageview',
				page: '/category',
				title: 'Category Page',
				dimension1: 'logged',
				dimension4: 'premium'
			});
		})
	});

	describe('trackEvent -', function(){
		it('method track a GA event', function(){
			AnalyticsService.trackEvent({
				category: 'Sport',
				action: 'Shot',
				label: 'GOAL',
				value: 5,
				dimensions: {
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				}
			});

			expect(window.ga).toHaveBeenCalledWith('send', {
				hitType: 'event',
				eventCategory: 'Sport',
				eventAction: 'Shot',
				eventLabel: 'GOAL',
				eventValue: 5,
				dimension1: 'logged',
				dimension4: 'premium'
			});
		});

		it('method track a GA event, logger', function(){
			AnalyticsService.trackEvent({
				category: 'Sport',
				action: 'Shot',
				label: 'GOAL',
				value: 5,
				dimensions: {
					dimensionOne: 'logged',
					dimensionFour: 'premium'
				}
			});

			expect(logger.log).toHaveBeenCalledWith('BarneyAnalytics', 'track event', {
				hitType: 'event',
				eventCategory: 'Sport',
				eventAction: 'Shot',
				eventLabel: 'GOAL',
				eventValue: 5,
				dimension1: 'logged',
				dimension4: 'premium'
			});
		})
	});


});