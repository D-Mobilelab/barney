'use strict';

angular.module('barney.storage').provider('BarneyStorage',
	[function () {

	'use strict'

	var Dixie = function(){

		var dixieInstance = this;

		var tryParse = function(value){
			try { 
				return JSON.parse(value)
			} catch (err) {
				return value;
			}
		}

		///////////////////////////////////
		// Chicken: Object-based storage //
		///////////////////////////////////

		var Chicken = new function(){

			var chickenInstance = this;
			var jsObj = {};

			this.get = function(key){
				return jsObj[key];
			}

			this.set = function(key, value){
				jsObj[key] = value;
			}

			this.getMultiple = function(keys){
				var toReturn = {};
				if (!!keys){
					for (var key in keys){
						toReturn[key] = jsObj[key];
					}
				} else {
					for (var key in jsObj){
						toReturn[key] = jsObj[key];
					}
				}
				return toReturn;
			}

			this.setMultiple = function(params){
				for (var key in params){
					chickenInstance.set(key, params[key]);
				}
			}

			this.delete = function(key){
				delete jsObj[key];
			}
		} // end Chicken


		///////////////////////////////////////
		// Depot: localStorage-based storage //
		///////////////////////////////////////

		var Depot = new function(){

			var depotInstance = this;

			this.get = function(key){
				return tryParse(window.localStorage.getItem(key));
			}

			this.set = function(key, value){
				window.localStorage.setItem(key, JSON.stringify(value));
			}

			this.getMultiple = function(keys){
				var toReturn = {};
				if (!!keys){
					for (var key in keys){
						toReturn[key] = depotInstance.get(key);
					}
				} else {
					for (var i=0, len=localStorage.length; i<len; ++i){
						var key = localStorage.key(i);
						toReturn[key] = depotInstance.get(key);
					}
				}
				return toReturn;
			}

			this.setMultiple = function(params){
				for (var key in params){
					depotInstance.set(key, params[key]);
				}
			}

			this.delete = function(key){
				window.localStorage.removeItem(key);
			}
		} // end Depot


		///////////////////////////////////
		// Biscuit: cookie-based storage //
		///////////////////////////////////

		var Biscuit = new function(){

			var biscuitInstance = this;

			this.DEFAULT_EXPIRATION_TIME = 3650; // (days)

			var CookieIterator = function(){
				var iteratorInstance = this;
				var cookiesList = document.cookie.split(';');

				this.hasNext = function(){
					return cookiesList.length > 0;
				}

				this.next = function(){
					// return undefined if the list is empty
					if (cookiesList.length == 0) {
						return undefined;
					}

					// dequeue first element of cookiesList
					var toReturn = cookiesList.shift();

					// remove leading whitespaces only
					var charPos = 0;
					while (toReturn[charPos] == ' '){
						charPos++;
					}
					toReturn = toReturn.substring(charPos);

					// split 'key=value' string by first '=' occurrence (regex greedy operator)
			        var values = toReturn.split(/=(.+)?/);
			        return [values[0], values[1]];
				}
			} // end CookieIterator

			this.newCookieIterator = function(){
				return new CookieIterator();
			}
			
			this.get = function(name){
				var iter = biscuitInstance.newCookieIterator();
				var result;

				while (result = iter.next()){
					if (result[0] == name){
						return tryParse(result[1]);
					}
				}
				return undefined;
			}

			this.getMultiple = function(keys){
				var toReturn = {};
			    var iter = biscuitInstance.newCookieIterator();
			    var result;

				while (result = iter.next()) {
					if (!keys || keys.indexOf(result[0]) > 0) {
						logger.log("Biscuit", 'getMultiple', result)
						toReturn[result[0]] = tryParse(result[1]);
					}
				}
			    return toReturn;
			}

			this.set = function(name, value, exdays) {
			    var newCookie = name + "=" + JSON.stringify(value);
			    
			    // set default exdays value
			    exdays = exdays ? exdays : biscuitInstance.DEFAULT_EXPIRATION_TIME;

			    // set expiration date
		    	var d = new Date();
			    d.setTime(d.getTime() + (exdays*24*60*60*1000));
			    newCookie += "; expires=" + d.toUTCString();

			    // set cookie
			    document.cookie = newCookie;
			}

			this.setMultiple = function(params, exdays){
				for (var key in params){
					biscuitInstance.set(key, params[key], exdays);
				}
			}

			this.delete = function(name){
				biscuitInstance.set(name, '', -1);
			}
		} // end Biscuit


		/////////////////////////////////////////
		// Configuration and logging utilities //
		/////////////////////////////////////////

		var selectedStorage;
		var options = {
			type: 'localStorage' // default type
		};
		var logger;
		
		this.StandardLogger = new function(){
			this.log = function(){ console.log(arguments); };
			this.info = function(){ console.info(arguments); }; 
			this.warn = function(){ console.warn(arguments); }; 
			this.error = function(){ console.error(arguments); }; 
		};

		this.MuteLogger = new function(){
			this.log = function(){};
			this.info = function(){}; 
			this.warn = function(){};
			this.error = function(){}; 
		};
		// default: no log messages
		logger = this.MuteLogger; 

		var storages = {
			'cookie': Biscuit,
			'localStorage': Depot,
			'Object': Chicken
		}

		this.selectStorage = function(type){
			selectedStorage = storages[type];
			// update config
			options.type = type;
		}
		this.selectStorage(options.type);

		this.getConfig = function(){
			logger.log("Dixie", "getConfig", options);
			// READONLY config
			// stringify and parse to create a new object
			// we don't want to expose the real configuration publicly
			return JSON.parse(JSON.stringify(options));
		}

		this.init = function(params){
			// update options
			if (params){
				// SETUP STORAGE TYPE
				if (typeof(params.type) != "undefined"){
					dixieInstance.selectStorage(params.type);
				}

				// SETUP LOGGER
				if(typeof(params.logger) != "undefined"){
					if (params.logger == true){
						logger = dixieInstance.StandardLogger;
					} else if (params.logger == false){
						logger = dixieInstance.MuteLogger;
					} else {
						var validLogger = typeof params.logger.log != 'undefined' 
											&& typeof params.logger.info != 'undefined' 
											&& typeof params.logger.warn != 'undefined' 
											&& typeof params.logger.error != 'undefined';
						if (validLogger){						
							logger = params.logger;
						} else {
							console.error('Dixie', 'init', 'illegal logger param value')
						}
					}
				}

				// SAVE OPTIONS
				options = params;
				logger.log("Dixie", "init", "custom options", options);
			}
			else {
				logger.log("Dixie", "init", "default options");
			}
		}

		////////////////////////////////////////
		// Main methods (getters and setters) //
		////////////////////////////////////////

		this.set = function(key, value, exdays){
			selectedStorage.set(key, value, exdays);
			logger.log("Dixie", "set", key, value, exdays);
		}

		this.get = function(key){
			var value = selectedStorage.get(key);
			logger.log("Dixie", "get", key, value);
			return value;
		}

		this.getMultiple = function(keys){
			var values = selectedStorage.getMultiple(keys);
			logger.log("Dixie", "getMultiple", keys, values);
			return values;
		}

		this.setMultiple = function(params, exdays){
			selectedStorage(params, exdays);
			logger.log("Dixie", "setMultiple", params, exdays);
		}

		this.delete = function(key){
			selectedStorage.delete(key);
			logger.log("Dixie", "delete", key);
		}

	} // end Dixie

    // aggiunge a this l'oggetto Dixie riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, new Dixie());
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
    	return this;
    }];

}]);