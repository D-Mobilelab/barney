if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.StorageCookie = new function(){

    // Cookie: cookie-based storage

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
barney.StorageJsObject = new function(){

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
barney.StorageLocal = new function(){

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
/**
 * @ngdoc object
 * @name storage
 *
 * @description
 * Storage is the module for all the type of storage.
 *
 * You can use it to:
 * - set/get a single storage value;
 * - set/get multiple storage values;
 * - delete a storage value
 * - check if localStorage, Cookie or JsObject storages are supported.
 *
 * # Import & Usage
 * ## Vanilla JS
 * Import this single file to use Storage module, in Vanilla JS:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/base/storage.js"> 
 * </pre>
 * Now you can use global object **barney.Storage** and associated methods, described below. <br/>
 * You can start by initializing it with {@link storage#methods_init init} method.
 *
 * ## Angular
 * Import this single file to use Storage module, in Angular framework:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/angular/storage.js"> 
 * </pre>
 * Now you can import **barney** module for your Angular app.
 * <pre>
 * angular.module('yourApp', [ 'barney' ]);
 * </pre>
 * Storage module for Angular contains only {@link storage.BarneyStorage BarneyStorage service}.
 */
barney.Storage = new function(){

    var selectedStorage = null;

    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    var storages = {
        'cookie': barney.StorageCookie,
        'localStorage': barney.StorageLocal,
        'jsObject': barney.StorageJsObject
    };

    /**
     * @ngdoc function
     * @name storage#init
     * @methodOf storage
     *
     * @description Init storage module.
     *
     * @param {Object} params (see attributes below)
     * @param {string} [params.type=null] Define the storage type used to save and get data. It can be:
     *
     * - localStorage,
     * - cookie,
     * - jsObject
     *
     * @param {Object} [params.logger=null] Object used to log (i.e: window.console, BarneyLogger, ...)
     *
     * @example
     * In this example I set cookie as default storage and BarneyLogger as default logger
     *
     * <pre>
     *  Storage.init({
     *    type: 'cookie',
     *    logger: BarneyLogger
     * });
     * </pre>
     * 
    */
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


    /**
     * @ngdoc function
     * @name storage#set
     * @methodOf storage
     *
     * @description 
     * This method is used to set a value in the storage.
     *
     * @param {string} key Key to identify value
     * @param {*} value Value to store
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] If options.type is defined, it sets value in the defined storage, 
     * else it stores in the default storage (defined in init method before)
     *
     * @example
     * In this example I set the key 'key' with value 'value', in cookie storage
     * <pre>
     * Storage.set('key', 'value', {type: 'cookie'});
     * </pre>
     */
    this.set = function(key, value, options){
        if(!!options && !!options.type){
            console.log(storages, storages[options.type], options.type);
            storages[options.type].set(key, value, options);
        } else {
            selectedStorage.set(key, value, options);
        }
        // selectedStorage.set(key, value, exdays);
        logger.log('BarneyStorage', 'set', key, value, options);
    };

     /**
     * @ngdoc function
     * @name storage#get
     * @methodOf storage
     *
     * @description 
     * This method is used to get a value from the storage.
     *
     * @param {string} key Key to identify value
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] If options.type is defined, it gets value in the defined storage, 
     * else it gets in the default storage (defined in init method before)
     *
     * @example
     * # Storage get 
     * In this example I get the key 'key' from cookie storage
     * <pre>
     * barney.Storage.get('key', {type: 'cookie'});
     * </pre>
     */
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

    /**
     * @ngdoc function
     * @name storage#getMultiple
     * @methodOf storage
     *
     * @description 
     * This method is used to get multiple values in the Storage.
     *
     * @param {array} keys Array with keys to identify values
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] If options.type is defined, it gets values from the defined storage, 
     * else it gets from the default storage (defined in init method before)
     *
     * @example
     * # Storage getMultiple 
     * <pre>
     *   barney.Storage.getMultiple(['key1', 'key2', ...], {type: 'cookie'});
     * </pre>
     * 
     */
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

    /**
     * @ngdoc function
     * @name storage#setMultiple
     * @methodOf storage
     *
     * @description 
     * This method is used to set multiple values in the storage.
     *
     * @param {Object} params Object with keys and values
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] If options.type is defined, it sets value in the defined storage, 
     * else it stores in the default storage (defined in init method before)
     *
     * @example
     * # Storage setMultiple 
     * <pre>
     *   barney.Storage.setMultiple({'key1':1, 'key2':2, ...},{type: 'cookie'});
     * </pre>
     * 
     */
    this.setMultiple = function(params, options){
        if(!!options && !!options.type){
            storages[options.type].setMultiple(params, options);
        } else {
            selectedStorage.setMultiple(params, options);
        }
        // selectedStorage.setMultiple(params, exdays);
        logger.log('BarneyStorage', 'setMultiple', params, options);
    };


    /**
     * @ngdoc function
     * @name storage#delete
     * @methodOf storage
     *
     * @description 
     * This method is used to delete a stored value in the default Storage.
     *
     * @param {string} key Key to identify value
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] If options.type is defined, it deletes the key
     * from defined storage, else it deletes it from the default storage (defined in init method before)
     *
     * @example
     * # Storage delete 
     * Here is an example of the delete method.
     * 
     * In this example I delete from cookie the key called 'key';
     * <pre>
     * barney.Storage.delete('key', {type: 'cookie'});
     * </pre>
     * 
     */
    this.delete = function(key, options){
        if(!!options && !!options.type){
            storages[options.type].delete(key, options);
        } else {
            selectedStorage.delete(key, options);
        }
        // selectedStorage.delete(key);
        logger.log('BarneyStorage', 'delete', key, options);
    };

    /**
     * @ngdoc function
     * @name storage#isLocalStorageSupported
     * @methodOf storage
     *
     * @description 
     * This method is used to know if the browser support the local storage
     *
     * @example
     * <pre>
     *  if(barney.Storage.isLocalStorageSupported()) {
     *       // store a localstorage key
     *   } else {
     *       alert('local storage is not supported');
     *   }
     * </pre>
     * 
    */
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
/**
 * @ngdoc object
 * @name storage.BarneyStorage
 *
 * @description 
 * Angular service of {@link storage Storage} module
 *
 * # Import & Usage
 * To use Storage service, you have to add BarneyStorage 
 * dependency to your component (directive, controller...).
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyStorage',
 *     function(BarneyStorage){
 *         // we can use "BarneyStorage" object here
 *     }
 * ]);
 * </pre>
 */
angular.module('barney').provider('BarneyStorage',
    function () {

        var Storage = {

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#init
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_init init} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            init: function(params){
                barney.Storage.init(params);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#set
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_set set} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            set: function(key, value, options){
                barney.Storage.set(key, value, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#get
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_get get} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            get: function(key, options){
                return barney.Storage.get(key, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#getMultiple
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_getMultiple getMultiple} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            getMultiple: function(keys, options){
                return barney.Storage.getMultiple(keys, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#setMultiple
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_setMultiple setMultiple} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            setMultiple: function(params, options){
                barney.Storage.setMultiple(params, options);
            },
                
            /**
             * @ngdoc function
             * @name storage.BarneyStorage#delete
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_delete delete} method of Storage module, replacing *barney.Storage* to *BarneyStorage*
             */
            delete: function(key, options){
                barney.Storage.delete(key, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#isLocalStorageSupported
             * @methodOf storage.BarneyStorage
             *
             * @description Refer to {@link storage#methods_isLocalStorageSupported isLocalStorageSupported} method of Storage module, replacing *barney.storage* to *BarneyStorage*
             */
            isLocalStorageSupported: function(){
                return barney.Storage.isLocalStorageSupported();
            }

        };

        // aggiunge a this l'oggetto Storage riportato sopra,
        // in questo modo si possono chiamare i methods da .config()
        angular.extend(this, Storage);
        // richiama lo Storage riportato sopra,
        // in questo modo si possono chiamare i methods da .run()
        this.$get = [function() {
            return this;
        }];
    }
);