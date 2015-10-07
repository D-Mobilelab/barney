'use strict';

angular.module('barney.analytics').factory('BarneyAnalytics', [
	function(){

		this.dimensions = {};
		this.enabled = true;
		this.verbose = false;
		this.logger = {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		},

		this.init = function(options){
			if(options){
				if(options.dimensions){
					this.dimensions = options.dimensions;
				}
				if(typeof(options.enabled) != "undefined"){
					this.enabled = options.enabled;
				}
				if(typeof(options.verbose) != "undefined"){
					this.verbose = options.verbose;
				}
				if(typeof(options.logger) != "undefined"){
					this.logger = options.logger;
				}
			}

			if(this.verbose){
				this.logger.log("BarneyAnalytics", "init", this);
			}
		};

		this.setId = function(id){
			if(id){
				if(this.verbose){
					this.logger.log("BarneyAnalytics", "set id", id);
				}

				if(this.enabled){
					ga('set', '&uid', id);
				}
			}
		};

		this.setDimension = function(dimensions){
			if(dimensions){
				for(var key in dimensions){
					var slot = this.dimensions[key];
					var value = dimensions[key];

					if(this.verbose){
						this.logger.log("BarneyAnalytics", "set dimension", slot, value);
					}

					if(this.enabled){
						ga('set', 'dimension' + slot, value);
					}
				}
			}
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

			if(this.verbose){
				this.logger.log("BarneyAnalytics", "track pageview", properties);
			}

			if(this.enabled){
				ga('send', properties);
			}
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

			if(this.verbose){
				this.logger.log("BarneyAnalytics", "track event", properties);
			}

			if(this.enabled){
				ga('send', properties);
			}
		};

		return this;

	}
]);