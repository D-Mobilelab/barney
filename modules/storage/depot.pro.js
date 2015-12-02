'use strict';

angular.module('barney.storage.subset').provider('BarneyStorageDepot',
	[function () {

	///////////////////////////////////////
	// Depot: localStorage-based storage //
	///////////////////////////////////////

	var Depot = {
		get: function(key){
			return tryParse(window.localStorage.getItem(key));
		},

		set: function(key, value){
			window.localStorage.setItem(key, JSON.stringify(value));
		},

		getMultiple: function(keys){
			var toReturn = {};
			if (!!keys){
				for (var key in keys){
					toReturn[key] = this.get(key);
				}
			} else {
				for (var i=0, len=localStorage.length; i<len; ++i){
					var key = localStorage.key(i);
					toReturn[key] = this.get(key);
				}
			}
			return toReturn;
		},

		setMultiple: function(params){
			for (var key in params){
				this.set(key, params[key]);
			}
		},

		delete: function(key){
			window.localStorage.removeItem(key);
		}
	}

	var tryParse = function(value){
		try { 
			return JSON.parse(value)
		} catch (err) {
			return value;
		}
	}

    // aggiunge a this l'oggetto Depot riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, Depot);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
    	return this;
    }];

}]);