'use strict';

angular.module('barney.storage').factory('BarneyStorage', [
	'$window',
	function($window){

		this.type = 'localStorage';

		this.init = function(object){
			if(!!object){
				this.type = !!object.type;
			}
		}

		this.set = function(key, value){
			if(this.type == 'localStorage'){
				$window.localStorage.setItem(key, value);
			}
		}

		this.get = function(key){
			if(this.type == 'localStorage'){
				return $window.localStorage.getItem(key);
			}
		}

		this.delete = function(key){
			if(this.type == 'localStorage'){
				$window.localStorage.removeItem(key);
			}
		}

		this.setMultiple = function(params){
			for(var key in params){
				this.set(key, params[key]);
			}
		}

		
		return this;

	}
]);