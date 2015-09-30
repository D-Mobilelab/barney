'use strict';

angular.module('barney.callbacky').provider('BarneyCallbacky',
	[function () {
	
	var myProvider = {

		set: {},

		bind: function(key, method){
			if(!this.set[key]){ 
				this.set[key] = [];
			}
			this.set[key].push(method);
		},

		trigger: function(key, arg){
			if(this.set[key] && this.set[key].length > 0){
				for(var i in this.set[key]){
					this.set[key][i].call(arg);
				}
			}
		},

		clean: function(key){
			if(this.set[key]){
				this.set[key] = [];
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