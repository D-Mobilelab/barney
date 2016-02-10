/**
 * @ngdoc object
 * @name utility.BarneyUtility
 *
 * @description
 * Use Utility service
 *
 * To use Utility service, you have to add BarneyUtility dependency to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyUtility to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyUtility', '$scope',
 *     function(Utility, $scope){
 *         // we can use "Utility" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyUtility as dependency but I have renamed it as Utility to use it more easily in controller code.
 *
 * # List Method
 * - {@link utility.BarneyUtility#methods_addQueryParams addQueryParams}
 * - {@link utility.BarneyUtility#methods_arrayDiff arrayDiff}
 * - {@link utility.BarneyUtility#methods_brutalRedirect brutalRedirect}
 * - {@link utility.BarneyUtility#methods_clickAndGo clickAndGo}
 * - {@link utility.BarneyUtility#methods_getCurrentQueryString getCurrentQueryString}
 *
 */
angular.module('barney').factory('BarneyUtility',
    ['$location', '$window',
    function($location, $window){

        /**
         * @ngdoc function
         * @name utility.BarneyUtility#getCurrentQueryString
         * @methodOf utility.BarneyUtility
         *
         * @description 
         * This method return the query string from the URL, before and after the hashbang (#!).
         *
         * @example
         * # Utility getCurrentQueryString 
         * Here is an example of the getCurrentQueryString method.
         *
         * ***?hello=world/#!/category*** or in ***\#!/category/?hello=world***
         * 
         * <pre>
         *   Utility.getCurrentQueryString(); 
         *   // it returns { hello: 'world' }
         * </pre>
         * 
        */

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

        /**
         * @ngdoc function
         * @name utility.BarneyUtility#addQueryParams
         * @methodOf utility.BarneyUtility
         *
         * @description 
         * This method add one or more query string params to the 
         * current URL or to a new URL
         *
         * @param {Object} newParams Object with params
         * @param {string} newUrl New URL
         *
         * @example
         * <pre>
         * 
         *   //current URL =  http://foo.com?mars=earth 
         *   Utility.addQueryParams({ hello: 'world' })
         *   //new URL =   http://foo.com?mars=earth&hello=world
         *
         *   //current URL = http://foo.com?mars=earth 
         *   Utility.addQueryParams({ hello: 'world' }, 'http://var.com')
         *   //new URL = http://var.com?hello=world
         *
         *   //current URL = 'http://foo.com?mars=earth' 
         *   Utility.addQueryParams({ hello: 'world' }, 'http://var.com?venus=sun')
         *   //new URL = 'http://var.com?venus=sun&hello=world'
         *   
         *
         * </pre>
         * 
        */
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

        /**
         * @ngdoc function
         * @name utility.BarneyUtility#arrayDiff
         * @methodOf utility.BarneyUtility
         *
         * @description 
         * This method removes from the first array the element of the second
         *
         * @param {array} first first array 
         * @param {array} second second (contain the elements to remove)
         *
         * @example
         * <pre>
         *  var array1 = ['1','2','3']
         *  var array2 = ['2'];
         * 
         *  Utility.arrayDiff(array1, array2); 
         *  // it returns an array ['1', '3']
         * </pre>
         * 
        */

        this.arrayDiff = function(first, second){
            return first.filter(function(i) {
                return second.indexOf(i) < 0;
            });
        };

        /**
         * @ngdoc function
         * @name utility.BarneyUtility#brutalRedirect
         * @methodOf utility.BarneyUtility
         *
         * @description 
         * This method does a brutal redirect to the given URL.
         *
         * ***Usefull for ios***
         *
         * @param {string} url New url to redirect to
         *
         * @example
         * <pre>
         *  Utility.brutalRedirect('http://my_new.url')
         * </pre>
         * 
        */
        
        this.brutalRedirect = function(url){
            $window.location.href = url;
            // reload for Safari
            if(navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
                $window.location.reload(true);
            }
        };


        /**
         * @ngdoc function
         * @name utility.BarneyUtility#clickAndGo
         * @methodOf utility.BarneyUtility
         *
         * @description 
         * This function makes sure that a link is followed by the browser
         * when the user clicks on it, even if the item clicked contains ***ng-click***
         *
         * @param {*} event Event to catch
         *
         * @example
         * <pre>
         *  Utility.clickAndGo(myEvent)
         * </pre>
         * 
        */
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