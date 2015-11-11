'use strict';

angular.module('barney.callbacky').provider('BarneyCallbacky',
	[function () {
	
	var myProvider = {

		set: {},

		verbose: false,
		logger: {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		},

		init: function(options){
			if(options){
				if(typeof(options.verbose) != "undefined"){
					this.verbose = options.verbose;
				}
				if(typeof(options.logger) != "undefined"){
					this.logger = options.logger;
				}
			}
			if(this.verbose){
				this.logger.log("BarneyCallbacky", "init", this);
			}
		},

		bind: function(key, method){
			if(!this.set[key]){ 
				this.set[key] = [];
			}
			this.set[key].push(method);
			if(this.verbose){
				this.logger.log("BarneyCallbacky", "bind", key, method);
			}
		},

		trigger: function(key, arg){
			if(this.set[key] && this.set[key].length > 0){
				for(var i in this.set[key]){
					this.set[key][i].call(this, arg);
				}
			}
			if(this.verbose){
				this.logger.log("BarneyCallbacky", "trigger", key, arg);
			}
		},

		clean: function(key){
			if(this.set[key]){
				this.set[key] = [];
			}
			if(this.verbose){
				this.logger.log("BarneyCallbacky", "clean", key);
			}
		}

	}
    // aggiunge a this il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, myProvider);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
    	return this;
    }];

}]);