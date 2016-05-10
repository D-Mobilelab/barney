if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.StorageBiscuit = new function(){

    // Biscuit: cookie-based storage

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

    this.get = function(key){
        var iter = newCookieIterator();
        var result = iter.next();

        while (result){
            if (result[0] === key){
                return tryParse(result[1]);
            }
            result = iter.next();
        }
        return undefined;
    };

    this.set = function(key, value, options){
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
    };

    this.getMultiple = function(keys){
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
    };

    this.setMultiple = function(params, options){
        for (var key in params){
            this.set(key, params[key], options);
        }
    };

    this.delete = function(key){
        this.set(key, '', { exdays: -1 });
    };

};
angular.module('barney').provider('BarneyStorageBiscuit', function () {

    // Biscuit: cookie-based storage 

    var Biscuit = {

        get: function(key){
            return barney.StorageBiscuit.get(key);
        },

        set: function(key, value, options){
            barney.StorageBiscuit.set(key, value, options);
        },

        getMultiple: function(keys){
            return barney.StorageBiscuit.getMultiple(keys);
        },

        setMultiple: function(params, options){
            barney.StorageBiscuit.setMultiple(params, options);
        },

        delete: function(key){
            barney.StorageBiscuit.delete(key);
        }
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
barney.StorageChicken = new function(){

    var jsObj = {};

    this.get = function(key){
        return jsObj[key];
    };

    this.set = function(key, value){
        jsObj[key] = value;
    };

    this.getMultiple = function(keys){
        var toReturn = {};
        var index, key;
        if (!!keys){
            for (index in keys){
                key = keys[index];
                toReturn[key] = jsObj[key];
            }
        } else {
            for (key in jsObj){
                toReturn[key] = jsObj[key];
            }
        }
        return toReturn;
    };

    this.setMultiple = function(params){
        for (var key in params){
            this.set(key, params[key]);
        }
    };

    this.delete = function(key){
        delete jsObj[key];
    };
};
angular.module('barney').provider('BarneyStorageChicken', function () {

    // Chicken: Object-based storage

    var Chicken = {

        get: function(key){
            return barney.StorageChicken.get(key);
        },

        set: function(key, value){
            barney.StorageChicken.set(key, value);
        },

        getMultiple: function(keys){
            return barney.StorageChicken.getMultiple(keys);
        },

        setMultiple: function(params){
            barney.StorageChicken.setMultiple(params);
        },

        delete: function(key){
            barney.StorageChicken.delete(key);
        }
    };

    angular.extend(this, Chicken);
    this.$get = [function() {
        return this;
    }];

});
barney.StorageDepot = new function(){

    var tryParse = function(value){
        try { 
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    };

    this.get = function(key){
        return window.localStorage.getItem(key) !== null ? tryParse(window.localStorage.getItem(key)) : undefined;
    };

    this.set = function(key, value){
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    this.getMultiple = function(keys){
        var toReturn = {};
        var index, key;
        if (!!keys){
            for (index in keys){
                key = keys[index];
                toReturn[key] = this.get(key);
            }
        } else {
            for (var i = 0, len = localStorage.length; i < len; ++i){
                key = localStorage.key(i);
                toReturn[key] = this.get(key);
            }
        }
        return toReturn;
    };

    this.setMultiple = function(params){
        for (var key in params){
            this.set(key, params[key]);
        }
    };

    this.delete = function(key){
        window.localStorage.removeItem(key);
    };

};
angular.module('barney').provider('BarneyStorageDepot', function () {

    // Depot: localStorage-based storage 

    var Depot = {
        get: function(key){
            return barney.StorageDepot.get(key);
        },

        set: function(key, value){
            barney.StorageDepot.set(key, value);
        },

        getMultiple: function(keys){
            return barney.StorageDepot.getMultiple(keys);
        },

        setMultiple: function(params){
            barney.StorageDepot.setMultiple(params);
        },

        delete: function(key){
            barney.StorageDepot.delete(key);
        }
    };

    // aggiunge a this l'oggetto Depot riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, Depot);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
        return this;
    }];

});
barney.Storage = new function(){

    var selectedStorage = null;

    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    var storages = {
        'cookie': barney.StorageBiscuit,
        'localStorage': barney.StorageDepot,
        'jsObject': barney.StorageChicken
    };

    this.init = function(params){
        if (params){
            // SETUP STORAGE TYPE
            if(!!params.type){
                selectedStorage = storages[params.type];
            }
            
            // SETUP LOGGER
            if(!!params.logger){
                if(params.logger === true){
                    logger = window.console;
                } else {
                    logger = params.logger;
                }
            }
        }
        logger.log('BarneyStorage', 'init', params, selectedStorage, logger);
    };

    this.set = function(key, value, options){
        if(!!options && !!options.type){
            storages[options.type].set(key, value, options);
        } else {
            selectedStorage.set(key, value, options);
        }
        // selectedStorage.set(key, value, exdays);
        logger.log('BarneyStorage', 'set', key, value, options);
    };

    this.get = function(key, options){
        var value;
        if(!!options && !!options.type){
            value = storages[options.type].get(key, options);
        } else {
            value = selectedStorage.get(key, options);
        }
        // var value = selectedStorage.get(key);
        logger.log('BarneyStorage', 'get', key, value, options);
        return value;
    };

    this.getMultiple = function(keys, options){
        var values;
        if(!!options && !!options.type){
            values = storages[options.type].getMultiple(keys, options);
        } else {
            values = selectedStorage.getMultiple(keys, options);
        }
        // var values = selectedStorage.getMultiple(keys);
        logger.log('BarneyStorage', 'getMultiple', values, options);
        return values;
    };

    this.setMultiple = function(params, options){
        if(!!options && !!options.type){
            storages[options.type].setMultiple(params, options);
        } else {
            selectedStorage.setMultiple(params, options);
        }
        // selectedStorage.setMultiple(params, exdays);
        logger.log('BarneyStorage', 'setMultiple', params, options);
    };
   
    this.delete = function(key, options){
        if(!!options && !!options.type){
            storages[options.type].delete(key, options);
        } else {
            selectedStorage.delete(key, options);
        }
        // selectedStorage.delete(key);
        logger.log('BarneyStorage', 'delete', key, options);
    };

    this.isLocalStorageSupported = function(){
        var name = 'test';
        try {
            localStorage.setItem(name, name);
            localStorage.getItem(name);
            localStorage.removeItem(name);
            return true;
        } catch (e) {
            return false;
        }
    };

};
angular.module('barney').provider('BarneyStorage',
    function () {

        var Storage = {

            init: function(params){
                barney.Storage.init(params);
            },

            set: function(key, value, options){
                barney.Storage.set(key, value, options);
            },

            get: function(key, options){
                return barney.Storage.get(key, options);
            },

            getMultiple: function(keys, options){
                return barney.Storage.getMultiple(keys, options);
            },

            setMultiple: function(params, options){
                barney.Storage.setMultiple(params, options);
            },
            
            delete: function(key, options){
                barney.Storage.delete(key, options);
            },

            isLocalStorageSupported: function(){
                return barney.Storage.isLocalStorageSupported();
            }

        };

        // aggiunge a this l'oggetto Dixie riportato sopra,
        // in questo modo si possono chiamare i methods da .config()
        angular.extend(this, Storage);
        // richiama il myProvider riportato sopra,
        // in questo modo si possono chiamare i methods da .run()
        this.$get = [function() {
            return this;
        }];
    }
);