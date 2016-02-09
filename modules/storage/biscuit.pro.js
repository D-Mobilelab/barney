angular.module('barney.storage').provider('BarneyStorageBiscuit', function () {

    // Biscuit: cookie-based storage 

    var Biscuit = {

        get: function(key){
            var iter = newCookieIterator();
            var result = iter.next();

            while (result){
                if (result[0] === key){
                    return tryParse(result[1]);
                }
                result = iter.next();
            }
            return undefined;
        },

        set: function(key, value, options){
            var newCookie = key + '=' + JSON.stringify(value);
            
            // set default exdays value
            if (!!options && typeof options.exdays !== 'undefined'){
                // set expiration date
                var d = new Date();
                d.setTime(d.getTime() + (options.exdays * 24 * 60 * 60 * 1000));
                newCookie += '; expires=' + d.toUTCString();
            }
                
            // set cookie
            document.cookie = newCookie;
        },

        getMultiple: function(keys){
            var toReturn = {};
            var iter = newCookieIterator();
            var result = iter.next();
            while (result) {
                if (!keys || keys.indexOf(result[0]) > -1) {
                    toReturn[result[0]] = tryParse(result[1]);
                }
                result = iter.next();
            }
            return toReturn;
        },

        setMultiple: function(params, options){
            for (var key in params){
                this.set(key, params[key], options);
            }
        },

        delete: function(key){
            this.set(key, '', { exdays: -1 });
        }
    };

    var tryParse = function(value){
        try { 
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    };

    var CookieIterator = function(){
        var cookiesList = document.cookie.split(';');

        this.hasNext = function(){
            return cookiesList.length > 0;
        };

        this.next = function(){
            // return undefined if the list is empty
            if (cookiesList.length === 0) {
                return undefined;
            }

            // dequeue first element of cookiesList
            var toReturn = cookiesList.shift();

            // remove leading whitespaces only
            var charPos = 0;
            while (toReturn[charPos] === ' '){
                charPos++;
            }
            toReturn = toReturn.substring(charPos);

            // split 'key=value' string by first '=' occurrence (regex greedy operator)
            var values = toReturn.split(/=(.+)?/);
            return [values[0], values[1]];
        };
    };

    var newCookieIterator = function(){
        return new CookieIterator();
    };

    // aggiunge a this l'oggetto Biscuit riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, Biscuit);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
        return this;
    }];

});