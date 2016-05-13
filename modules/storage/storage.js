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
        'cookie': barney.StorageBiscuit,
        'localStorage': barney.StorageDepot,
        'jsObject': barney.StorageChicken
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
     * barney.Storage.delete('key', {type: Cookie});
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