'use strict';

angular.module('barney.analytics').factory('BarneyAnalytics', [
	function(){

		this.dimensions = {};
		this.verbose = false;
		this.logger = console;

		this.init = function(options){
			if(options){
				if(options.dimensions){
					this.dimensions = options.dimensions;
				}
				if(options.verbose){
					this.verbose = options.verbose;
				}
				if(options.logger){
					this.logger = options.logger;
				}
			}

			this.logger.log("BarneyAnalytics", "init", this);
		};

		this.setDimension = function(newDimensions){
			if(newDimensions){
				for(var key in newDimensions){
					var value = newDimensions[key];
					this.dimensions[key] = value;
				}
			}

			this.logger.log("BarneyAnalytics", "setDimension", this.dimensions);
		};

		this.trackPage = function(options){
			var properties = { 
				'hitType': 'pageview'
			};

			if(options.page){
				properties["page"] = options.page;
			}
			if(options.title){
				properties["title"] = options.title;
			}
			if(options.dimensions){
				for(var key in options.dimensions){
					var slot = this.dimensions[key];
					var value = options.dimensions[key];
					properties["dimension" + slot]	= value;
				}
			}

			this.logger.log("BarneyAnalytics", "trackPage", properties);

			// ga('send', properties);
		};

		this.trackEvent = function(options){
			var properties = { 
				'hitType': 'event'
			};

			if(options.category){
				properties["eventCategory"] = options.category;
			}
			if(options.action){
				properties["eventAction"] = options.action;
			}
			if(options.label){
				properties["eventLabel"] = options.label;
			}
			if(options.value){
				properties["eventValue"] = options.value;
			}
			if(options.dimensions){
				for(var key in options.dimensions){
					var slot = this.dimensions[key];
					var value = options.dimensions[key];
					properties["dimension" + slot]	= value;
				}
			}

			this.logger.log("BarneyAnalytics", "trackEvent", properties);

			// ga('send', properties);
		};

		return this;

	}
]);