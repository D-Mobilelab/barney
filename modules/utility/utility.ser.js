'use strict';

angular.module('barney.utility').factory('BarneyUtility',
	['$location', '$window',
	function($location, $window){

		this.getCurrentQueryString = function(){
			// get current url
			var url = $location.absUrl();

			// get normalized query string after #!
			var vars = $location.search();

			// get un-normalized query string before #!
			var queryStringBef = window.location.search;
			
			// check if window.location is empty
			if(queryStringBef !== ''){
				// remove ? from querystring
				queryStringBef = queryStringBef.slice(1);
				// queryStringBef = queryStringBef.slice(queryStringBef.indexOf('?') + 1);

				if(!!queryStringBef){
					// create an array of query strings
					var hashes = queryStringBef.split('&');
					
					// loop query strings to split them
					for(var i = 0; i < hashes.length; i++){
						var hash = hashes[i].split('=');
						vars[hash[0]] = hash[1];
					}
				}
			}
			return vars;
		};

		this.addQueryParams = function(newParams, newUrl){
			// get existing query params
			if(!!newUrl){
				var queryString = getQueryString(newUrl);
			} else {
				var queryString = $location.search();
			}
			
			// encode and add newParams to query params
			for(var key in newParams){
				var value = newParams[key];
				key = encode(key);
				value = encode(value);
				queryString[key] = value;
			}
			
			// get url without query string and add ? to url
			if(!!newUrl){
				var url = newUrl;
			} else {
				var url = $location.absUrl();
			}
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

			function getQueryString(url) {
				var vars = [], hash;
				if(url.indexOf('?') != -1){
					var querystring = url.slice(url.indexOf('?') + 1);
					if(!!querystring){
						var hashes = querystring.split('&');
						console.log(hashes);
						for(var i = 0; i < hashes.length; i++){
							hash = hashes[i].split('=');
							// vars.push(hash[0]);
							vars[hash[0]] = hash[1];
						}
					}
				}
				return vars;
			}
		};

		this.arrayDiff = function(first, second){
			return first.filter(function(i) {
				return second.indexOf(i) < 0;
			});
		};

		this.brutalRedirect = function(url){
			$window.location.href = url;
			// reload for Safari
			if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
				$window.location.reload(true);
			}
		}

		this.clickAndGo = function(event){
			if(event.target.tagName == "A"){
				$location.url(event.target.hash.replace("#!", ""));
			} else if(!!event.path){
				for(var k=0; k < event.path.length; k++){
					if(event.path[k].tagName == "A"){
						$location.url(event.path[k].hash.replace("#!", ""));
						break;
					}
				}
			} else {
				var parentElement = event.target.parentElement
				while(parentElement){
					if(parentElement.tagName == "A"){
						$location.url(parentElement.hash.replace("#!", ""));
						break;
					} else {
						parentElement = parentElement.parentElement;
					}
				}
			}		
		}

		return this;

	}
]);