'use strict';

angular.module('barney.storage').provider('BarneyStorage',
	['BarneyStorageBiscuitProvider', 'BarneyStorageDepotProvider', 'BarneyStorageChickenProvider',
	function (Biscuit, Depot, Chicken) {

	var Storage = {

		selectedStorage: null,
		// options: {
		// 	type: 'localStorage'
		// },
		logger: {
			log: function(){},
			info: function(){},
			warn: function(){},
			error: function(){}
		},
		
		// StandardLogger: new function(){
		// 	this.log = function(){ console.log(arguments); };
		// 	this.info = function(){ console.info(arguments); }; 
		// 	this.warn = function(){ console.warn(arguments); }; 
		// 	this.error = function(){ console.error(arguments); }; 
		// },

		// this.MuteLogger: new function(){
		// 	this.log = function(){};
		// 	this.info = function(){}; 
		// 	this.warn = function(){};
		// 	this.error = function(){}; 
		// },

		// default: no log messages
		// logger: this.MuteLogger,

		// this.selectStorage = function(type){
		// 	selectedStorage = storages[type];
		// 	// update config
		// 	options.type = type;
		// },

		// this.selectStorage(options.type),

		storages: {
			'cookie': Biscuit,
			'localStorage': Depot,
			'jsObject': Chicken
		},

		init: function(params){
			// update options
			if (params){
				// SETUP STORAGE TYPE
				if(!!params.type){
					this.selectedStorage = this.storages[params.type];
				}
				
				// if (typeof(params.type) != "undefined"){
				// 	dixieInstance.selectStorage(params.type);
				// }

				// SETUP LOGGER
				if(!!params.logger){
					if(params.logger == true){
						this.logger = window.console;
					} else {
						this.logger = params.logger;
					}
				}
				
				// if(typeof(params.logger) != "undefined"){
				// 	if (params.logger == true){
				// 		logger = dixieInstance.StandardLogger;
				// 	} else if (params.logger == false){
				// 		logger = dixieInstance.MuteLogger;
				// 	} else {
				// 		var validLogger = typeof params.logger.log != 'undefined' 
				// 							&& typeof params.logger.info != 'undefined' 
				// 							&& typeof params.logger.warn != 'undefined' 
				// 							&& typeof params.logger.error != 'undefined';
				// 		if (validLogger){						
				// 			logger = params.logger;
				// 		} else {
				// 			console.error('Dixie', 'init', 'illegal logger param value')
				// 		}
				// 	}
				// }
			}

			this.logger.log("BarneyStorage", "init", params, this.selectedStorage, this.logger);
		},
		
		// init with arguments passed in the constructor
		// if (arguments[0]){
		// 	dixieInstance.init(arguments[0]);
		// }

		set: function(key, value, exdays){
			this.selectedStorage.set(key, value, exdays);
			this.logger.log("BarneyStorage", "set", key, value, exdays);
		},

		get: function(key){
			var value = this.selectedStorage.get(key);
			this.logger.log("BarneyStorage", "get", key, value);
			return value;
		},

		getMultiple: function(keys){
			var values = this.selectedStorage.getMultiple(keys);
			this.logger.log("BarneyStorage", "getMultiple", keys, values);
			return values;
		},

		setMultiple: function(params, exdays){
			this.selectedStorage.setMultiple(params, exdays);
			this.logger.log("BarneyStorage", "setMultiple", params, exdays);
		},

		delete: function(key){
			this.selectedStorage.delete(key);
			this.logger.log("BarneyStorage", "delete", key);
		}

		// getConfig: function(){
		// 	logger.log("BarneyStorage", "getConfig", this.selectedStorage, this.logger);
		// 	// READONLY config
		// 	// stringify and parse to create a new object
		// 	// we don't want to expose the real configuration publicly
		// 	return JSON.parse(JSON.stringify(this.options));
		// }

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