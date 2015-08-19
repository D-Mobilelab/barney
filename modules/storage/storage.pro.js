'use strict';

angular.module('barney.storage').provider('BarneyStorage',
	[function () {
	
	var myProvider = {

		jsObject: {},
		options: {
			type: 'localStorage'
		},

		init: function(options){
			this.options = options;
		},

		set: function(key, value){
			if(this.options.type == 'localStorage'){
				window.localStorage.setItem(key, JSON.stringify(value));
			} else if(this.options.type == 'jsObject'){
				this.jsObject[key] = value;
			}
		},

		get: function(key){
			if(this.options.type == 'localStorage'){
				return JSON.parse(window.localStorage.getItem(key));
			} else if(this.options.type == 'jsObject'){
				return this.jsObject[key];
			}
		},

		delete: function(key){
			if(this.options.type == 'localStorage'){
				window.localStorage.removeItem(key);
			} else if(this.options.type == 'jsObject'){
				delete this.jsObject[key];
			}
		},

		setMultiple: function(params){
			for(var key in params){
				this.set(key, params[key]);
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