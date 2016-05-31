/**
 * @ngdoc object
 * @name browser.BarneyBrowser
 *
 * @description
 * To use Browser service, you have to add BarneyBrowser dependency to your component (i.e: directive, controller...):
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyBrowser', '$scope',
 *     function(BarneyBrowser, $scope){
 *         // we can use "BarneyBrowser" object here
 *     }
 * ]);
 * </pre>
 * 
 * Remember that, before calling any other method, **the init method must be called first of all**.
 *
 */

angular.module('barney').factory('BarneyBrowser',
    ['$location', '$rootScope', '$window',
    function($location, $rootScope, $window){

        var previousPath = null;
        var previousState = null;

        var setPrevPath = function(path){
            previousPath = path;
        };

        var setPrevState = function(state){
            previousState = state;
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#init
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * When this method is called, the last visited page is saved and 
         * it can be used by getPrevPath(), getPrevState() and goBack() methods.
         *
         * @example
         * <pre>
         *  BarneyBrowser.init();
         * </pre>
         */
        this.init = function() {
            $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                if(newurl !== oldurl){
                    setPrevPath( oldurl.substr(oldurl.indexOf('#!') + 2) );
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
                if(!!previous && !!previous.$$route){
                    setPrevState( previous.$$route );
                }
            });
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#getPrevPath
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method is used to get the path of the last visited page.
         *
         * @example
         * <pre>
         *  // page: '#!/home'
         *  BarneyBrowser.init();
         *
         *  // change page to '#!/news'
         *
         *  BarneyBrowser.getPrevPath();
         *  // it returns '#!/home'
         * </pre>
         */
        this.getPrevPath = function(){
            return previousPath;
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#getPrevState
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method is used to get the state of the last visited page.
         *
         * @example
         * <pre>
         *  // state: 'home'
         *  BarneyBrowser.init();
         *
         *  // change state to 'news'
         *
         *  BarneyBrowser.getPrevState();
         *  // it returns 'home'
         * </pre>
         */
        this.getPrevState = function(){
            return previousState;
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#goBack
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method is used to go back to the last visited page.
         *
         * @example
         * <pre>
         *  // page: '#!/home'
         *  BarneyBrowser.init();
         *
         *  // change page to '#!/news'
         *
         *  BarneyBrowser.goBack();
         *  // it returns to '#!/home'
         * </pre>
         */
        this.goBack = function(){
            $location.url( this.getPrevPath() );
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#brutalRedirect
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method make a brutal redirect to the given URL (it's useful for iOs).
         *
         * @param {string} url New url to redirect to
         *
         * @example
         * <pre>
         *   BarneyBrowser.brutalRedirect('http://foo.bar')
         * </pre>
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
         * @name browser.BarneyBrowser#clickAndGo
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * When the user clicks on a link, even if the item clicked contains ***ng-click***, then this method
         * makes sure that the link is followed by the browser.
         *
         * @param {*} event Event to catch
         *
         * @example
         * <pre>
         *   // HTML
         *   <a href="http://foo.bar" ng-click="doSomething(event)">Hello</a>
         *
         *   // Javascript
         *   $scope.doSomething = function(event){
         *      // make "useful" something
         *      BarneyBrowser.clickAndGo(myEvent);
         *   }
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

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#mediaMatcher
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method call a method when a media query is triggered
         *
         * @param {string} mediaquery media query to trigger 
         * @param {function} callback method called when media query is triggered
         *
         * @example
         * <pre>
         *  BarneyBrowser.mediaMatcher("(min-width: 1024px)", function(mql){
         *    console.log("Media query changes to:", mql, mql.matches); 
         *  })
         * </pre>
         */
        this.mediaMatcher = function(mediaquery, callback){
            var isMatchMediaSupported = !!(window && window.matchMedia);
            if(typeof mediaquery === 'string' && typeof callback === 'function' && isMatchMediaSupported ){
                var mql = window.matchMedia(mediaquery);
                callback(mql);
                mql.addListener(callback); 
            }
        };

        /**
         * @ngdoc function
         * @name browser.BarneyBrowser#getCurrentQueryString
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method return the query string from the URL, before and after the hashbang (#!).
         *
         * @example
         * <pre>
         *   // URL could be: 'http://foo.bar/?hello=world/#!/category'
         *   // or 'http://foo.bar/#!/category/?hello=world'
         *
         *   BarneyBrowser.getCurrentQueryString(); 
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
         * @name browser.BarneyBrowser#addQueryParams
         * @methodOf browser.BarneyBrowser
         *
         * @description 
         * This method add one or more query string params to the 
         * current URL or to a new URL
         *
         * @param {Object} newParams params to add URL
         * @param {string} newUrl new URL, if not current
         *
         * @example
         * <pre>
         *   //current URL =  http://foo.com?mars=earth 
         *   BarneyBrowser.addQueryParams({ hello: 'world' })
         *   //new URL =   http://foo.com?mars=earth&hello=world
         *
         *   BarneyBrowser.addQueryParams({ hello: 'world' }, 'http://var.com')
         *   //new URL = http://var.com?hello=world
         *
         *   BarneyBrowser.addQueryParams({ hello: 'world' }, 'http://var.com?venus=sun')
         *   //new URL = 'http://var.com?venus=sun&hello=world'
         * </pre>
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


        return this;

    }
]);