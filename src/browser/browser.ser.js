export default ($location, $rootScope, $window) => {
    var previousPath = null;
    var previousState = null;

    var setPrevPath = function(path){
        previousPath = path;
    };

    var setPrevState = function(state){
        previousState = state;
    };

    var service = {
        init: function() {
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
        },

        getPrevPath: function(){
            return previousPath;
        },

        getPrevState: function(){
            return previousState;
        },

        goBack: function(){
            $location.url( this.getPrevPath() );
        },

        brutalRedirect: function(url){
            $window.location.href = url;
            // reload for Safari
            if(navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
                $window.location.reload(true);
            }
        },

        clickAndGo: function(event){
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
        },

        mediaMatcher: function(mediaquery, callback){
            var isMatchMediaSupported = !!(window && window.matchMedia);
            if(typeof mediaquery === 'string' && typeof callback === 'function' && isMatchMediaSupported ){
                var mql = window.matchMedia(mediaquery);
                callback(mql);
                mql.addListener(callback); 
            }
        },

        getQueryParams: function(newUrl){
            var url = newUrl ? newUrl : $location.absUrl();
            var vars = {};
            var hash;

            if(url.indexOf('?') !== -1){
                var querystring = url.slice(url.indexOf('?') + 1);
                if(!!querystring){
                    var hashes = querystring.split('&');
                    for(var i = 0; i < hashes.length; i++){
                        if(hashes[i].indexOf('=') !== -1) {
                            hash = hashes[i].split('=');
                            if(hash[1].indexOf('#') !== -1){
                                hash[1] = hash[1].slice(0, hash[1].indexOf('#'));
                            }
                            
                            vars[hash[0]] = window.decodeURIComponent(hash[1]);
                        }
                    }
                }
            }

            return vars;
        },

        addQueryParams: function(newParams, newUrl){
            var url = newUrl ? newUrl : $location.absUrl();
            var newQueryString = '';

            // reate encoded query string
            for(var key in newParams){
                newQueryString += encode(key) + '=' + encode(newParams[key]) + '&';
            }
            newQueryString = newQueryString.slice(0, -1);

            var questionMarkIndex = url.indexOf('?');
            if(questionMarkIndex === -1){
                url += '?' + newQueryString;
            } else {
                url = url.substr(0, questionMarkIndex + 1) + newQueryString + '&' + url.substr(questionMarkIndex + 1);
            }

            return url;

            function encode(string){
                try {
                    return encodeURIComponent(string);
                } catch(e) {
                    return string;
                }
            }
        }
    };

    return service;
};