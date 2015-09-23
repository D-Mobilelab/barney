'use strict';

angular.module('barney.stargate').factory('BarneyStargate',
	['$window', 
	function ($window) {
	
	var service = {
		active: false,
		instance: null,

		activate: function(flag){
			this.active = true;
		},

		// init({ configurations: ..., publicKey: ..., onHandshake: ... })
		init: function(options){
			if(this.active){
				if(!!options){
					this.instance = Stargate.initialize(options.configurations, options.publicKey, options.onHandshake);
				} else {
					this.instance = Stargate.initialize();
				}
			}
		},

		// openUrl({ url: 'http://www.google.it' });
		// openUrl({ fallback: function(){ window.open('http://www.google.com'); } });
		openUrl: function(options){
			if(this.active && this.instance){
				this.instance.openUrl(options.url);
			} else {
				if(!!options.fallback){
					options.fallback();
				} else {
					$window.location.href = options.url;
				}
			}
		}
	}
    
    return service;

}]);