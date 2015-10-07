'use strict';

angular.module('barney.newton').factory('BarneyNewton', [
	function(){

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
				this.logger.log("BarneyNewton", "init", this);
			}
		};

		this.trackPage = function(options){
			if(this.verbose){
				this.logger.log("BarneyNewton", "track", "pageview", options);
			}

			if(this.enabled){
				Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
			}
		};

		this.trackEvent = function(event, options){
			if(this.verbose){
				this.logger.log("BarneyNewton", "track", event, options);
			}

			if(this.enabled){
				Newton.getSharedInstance().sendEvent(event, Newton.SimpleObject.fromJSONObject(options));
			}
		};

		return this;

	}
]);