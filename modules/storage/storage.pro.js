'use strict';

angular.module('barney.storage').provider('BarneyStorage',
	['BarneyStorageBiscuitProvider', 'BarneyStorageDepotProvider', 'BarneyStorageChickenProvider',
	function (Biscuit, Depot, Chicken) {

	var Storage = {

		selectedStorage: null,
		logger: {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		},
		
		storages: {
			'cookie': Biscuit,
			'localStorage': Depot,
			'jsObject': Chicken
		},

		init: function(params){
			if (params){
				// SETUP STORAGE TYPE
				if(!!params.type){
					this.selectedStorage = this.storages[params.type];
				}
				
				// SETUP LOGGER
				if(!!params.logger){
					if(params.logger == true){
						this.logger = window.console;
					} else {
						this.logger = params.logger;
					}
				}
			}
			this.logger.log("BarneyStorage", "init", params, this.selectedStorage, this.logger);
		},

		set: function(key, value, options){
			if(!!options && !!options.type){
				this.storages[options.type].set(key, value, options);
			} else {
				this.selectedStorage.set(key, value, options);
			}
			// this.selectedStorage.set(key, value, exdays);
			this.logger.log("BarneyStorage", "set", key, value, options);
		},

		get: function(key, options){
			if(!!options && !!options.type){
				var value = this.storages[options.type].get(key, value, options);
			} else {
				var value = this.selectedStorage.get(key, options);
			}
			// var value = this.selectedStorage.get(key);
			this.logger.log("BarneyStorage", "get", key, value, options);
			return value;
		},

		getMultiple: function(keys, options){
			if(!!options && !!options.type){
				var values = this.storages[options.type].getMultiple(keys, options);
			} else {
				var values = this.selectedStorage.getMultiple(keys, options);
			}
			// var values = this.selectedStorage.getMultiple(keys);
			this.logger.log("BarneyStorage", "getMultiple", keys, values, options);
			return values;
		},

		setMultiple: function(params, options){
			if(!!options && !!options.type){
				this.storages[options.type].setMultiple(params, options);
			} else {
				this.selectedStorage.setMultiple(params, options);
			}
			// this.selectedStorage.setMultiple(params, exdays);
			this.logger.log("BarneyStorage", "setMultiple", params, options);
		},

		delete: function(key, options){
			if(!!options && !!options.type){
				this.storages[options.type].delete(key, options);
			} else {
				this.selectedStorage.delete(key, options);
			}
			// this.selectedStorage.delete(key);
			this.logger.log("BarneyStorage", "delete", key, options);
		},

		isLocalStorageSupported: function(){
			var name = 'test';
			try {
				localStorage.setItem(name, name);
				localStorage.getItem(name);
				localStorage.removeItem(name);
				return true;
			} catch (e) {
				return false;
			}
		}

	}

    // aggiunge a this l'oggetto Dixie riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, Storage);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
    	return this;
    }];

}]);