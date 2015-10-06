'use strict';

angular.module('barney.storage.subset').provider('BarneyStorageChicken',
	[function () {

	///////////////////////////////////
	// Chicken: Object-based storage //
	///////////////////////////////////

	var Chicken = {
		jsObj: {},

		get: function(key){
			return this.jsObj[key];
		},

		set: function(key, value){
			this.jsObj[key] = value;
		},

		getMultiple: function(keys){
			var toReturn = {};
			if (!!keys){
				for (var key in keys){
					toReturn[key] = this.jsObj[key];
				}
			} else {
				for (var key in this.jsObj){
					toReturn[key] = this.jsObj[key];
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
			delete this.jsObj[key];
		}
	}

    // aggiunge a this l'oggetto Chicken riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, Chicken);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
    	return this;
    }];

}]);