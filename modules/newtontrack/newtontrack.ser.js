'use strict';

/**
 * 
 * Barney Newton tracking module
 * this module track event on Newton
 * 
 * @project		Barney
 * @encoding UTF-8
 * @author		Giorgio Tonelli <g.tonelli@aimconsulting.it>
 * @creation 18/06/2015
 * 
 * @dependencies: Newton Sdk //static.newton.pm/js/<version>/newton.min.js
 * 
 * Newton tracking documentation
 * https://buongiorno.atlassian.net/wiki/pages/viewpage.action?spaceKey=NWT&title=Newton+API+Documentation
 * 
 * 
 */
angular.module('barney.newtontrack').factory('BarneyNewtontrack', [
	function(){

		this.enabled = true
		this.verbose = false;
		this.logger = window.console;
		this.Newton = null;
		this.userId = null;
		/*
		 * Newton required parameters
		 */
		this.newtonConfig = {
				secret: null // Newton secret key
		};
		/**
		 * Init module
		 * required parameters
		 *  options.secret
		 */
		this.init = function(options){
			if(options){
				
				if(typeof(options.logger) != "undefined"){
					this.logger = options.logger;
				}
				/**
				 * check for Newton sdk
				 */
				if(typeof(Newton) == "undefined"){
					this.enabled = false;
					this.logger.error("BarneyNewtontrack", "init", "Missing Newton sdk");
					return false;
				}
				
				if(typeof(options.enabled) != "undefined"){
					this.enabled = options.enabled;
				}
				if(typeof(options.verbose) != "undefined"){
					this.verbose = options.verbose;
				}

				
				/**
				 * check required newton configuration
				 */
				if(typeof(options.secret) == "undefined"){
					
					this.logger.error("BarneyNewtontrack", "init", "Missing newton configuration");
					this.enabled = false;
				}else{
					this.newtonConfig.secret = options.secret;
					
					if(this.verbose){
						this.logger.log("BarneyNewtontrack", "newton configuration", this.newtonConfig);
					}
				}

				/**
				 * create Newton instance
				 */
				if(this.enabled) {
					this.Newton = Newton.getSharedInstanceWithConfig(this.config);
				}

				
			};


			if(this.verbose){
				this.logger.log("BarneyNewtontrack", "init", this);
			}
		};
		/**
		 * event tracking
		 *  object:{
		 * 		action: '',
		 * 		properties:{
		 * 			key1: 'value' // value must be string|boolean|float|integer null
		 * 		}
		 * }
		 */
		this.trackEvent = function(object){
			
			if(!this.enabled){
				if(this.verbose){
					this.logger.log("BarneyNewtontrack", "eventTrack", "Newton tracking disabled");
					this.logger.log("BarneyNewtontrack", "eventTrack", object);
				}
				return false;
			}
			if(typeof(object.action)=='undefined'){
				this.logger.log("BarneyNewtontrack", "eventTrack", "Missing required action");
				return false;
			}
			var actionProp = false;
			if(typeof(object.properties) !='undefined'){
				properties =object.properties;
				// create properties simpleobject
				actionProp = Newton.SimpleObject.fromJSONObject(properties);
			}

			this.logger.log("BarneyNewtontrack", "eventTrack", object.action, actionProp);

			// call newton
			this.Newton.sendEvent(object.action, actionProp);
			

		};

		
		return this;
	}
]);