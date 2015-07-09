'use strict';

angular.module('barney.config').provider('BarneyConfig',
	['ConfObj',
	function (ConfObj) {
	// METODI DEL PROVIDER
	var myProvider = {
		options: {
			notExistValue:null
		},
		init: function(options){
			this.options = options;
		},
		nocache: function(nocacheatall) {
			if(nocacheatall){
				ConfObj['nocacheatall'] = "&nocacheatall=1";
			} else {
				ConfObj['nocacheatall'] = "";
			}
		},
		get: function(input) {
			if(!!input){
				var value = ConfObj[input];
				if (typeof value === 'undefined'){
					input = input.toUpperCase();
					value = ConfObj[input];
					if (typeof value === 'undefined'){
						return this.options.notExistValue;
					}
				}
				return value;
			} else {
				return null;
			}
		},
		list: function() {
			var value = ConfObj;
			if(typeof ConfObj === 'undefined'){
				value = [];
			}
			return value;
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
