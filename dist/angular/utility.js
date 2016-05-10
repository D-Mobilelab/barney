if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.Utility = new function(){

	this.arrayDiff = function(first, second){
    	return first.filter(function(i) {
            return second.indexOf(i) < 0;
        });
    };

    this.mediaMatcher = function(mediaquery, callback){
    	var isMatchMediaSupported = !!(window && window.matchMedia);
        if(typeof mediaquery === 'string' && typeof callback === 'function' && isMatchMediaSupported ){
            var mql = window.matchMedia(mediaquery);
            callback(mql);
            mql.addListener(callback); 
        }
    };

}
angular.module('barney').factory('BarneyUtility',
    ['$location', '$window',
    function($location, $window){

        this.arrayDiff = function(first, second){
            return barney.Utility.arrayDiff(first, second)
        };

        this.mediaMatcher = function(mediaquery, callback){
            barney.Utility.mediaMatcher(mediaquery, callback);
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.getCurrentQueryString = function(){
            // get normalized query string after #!
            var vars = $location.search();
            
            // get un-normalized query string before #!
            var queryStringBef = $window.location.search;
            
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

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.addQueryParams = function(newParams, newUrl){
            // get existing query params
            var queryString;
            if(!!newUrl){
                queryString = getQueryString(newUrl);
            } else {
                queryString = $location.search();
            }
            
            // encode and add newParams to query params
            var key;
            for(key in newParams){
                var value = newParams[key];
                key = encode(key);
                value = encode(value);
                queryString[key] = value;
            }
            
            // get url without query string and add ? to url
            var url;
            if(!!newUrl){
                url = newUrl;
            } else {
                url = $location.absUrl();
            }
            if(url.indexOf('?') > -1){
                url = url.substr(0, url.indexOf('?') + 1);
            } else {
                url += '?';
            }           

            // add all query params to url
            var first = true;
            for(key in queryString){
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

            function getQueryString(_url) {
                var vars = [], hash;
                if(_url.indexOf('?') !== -1){
                    var querystring = _url.slice(_url.indexOf('?') + 1);
                    if(!!querystring){
                        var hashes = querystring.split('&');
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

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.brutalRedirect = function(url){
            $window.location.href = url;
            // reload for Safari
            if(navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
                $window.location.reload(true);
            }
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.clickAndGo = function(event){
            if(event.target.tagName === 'A'){
                $location.url(event.target.hash.replace('#!', ''));
            } else if(!!event.path){
                for(var k = 0; k < event.path.length; k++){
                    if(event.path[k].tagName === 'A'){
                        $location.url(event.path[k].hash.replace('#!', ''));
                        break;
                    }
                }
            } else {
                var parentElement = event.target.parentElement;
                while(parentElement){
                    if(parentElement.tagName === 'A'){
                        $location.url(parentElement.hash.replace('#!', ''));
                        break;
                    } else {
                        parentElement = parentElement.parentElement;
                    }
                }
            }       
        };

        return this;

    }
]);