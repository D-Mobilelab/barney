'use strict';

angular.module('barney.utility').factory('BarneyUtility',
	['$location',
	function($location){

		this.addQueryParams = function(newParams){
			// get existing query params
			var queryString = $location.search();
			
			// encode and add newParams to query params
			for(var key in newParams){
				var value = newParams[key];
				key = encode(key);
				value = encode(value);
				queryString[key] = value;
			}
			
			// get url without query string and add ? to url
			var url = $location.absUrl();
			if(url.indexOf('?') > -1){
				url = url.substr(0, url.indexOf('?')+1);
			} else {
				url += '?';
			}			

			// add all query params to url
			var first = true;
			for(var key in queryString){
				if(!first){ 
					url += '&'; 
				} else {
					first = false;
				}
				url += key + '=' + queryString[key];
			}

			return url;
			
			function encode(string){
				try {
					return encodeURIComponent(string);
				} catch(e) {
					return string;
				}
			}
		};

		this.arrayDiff = function(first, second){
			return first.filter(function(i) {
				return second.indexOf(i) < 0;
			});
		};

		return this;

	}
]);