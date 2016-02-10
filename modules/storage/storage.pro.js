/**
 * @ngdoc object
 * @name storage.BarneyStorage
 *
 * @description
 * To use Storage service, you have to add BarneyStorage dependency to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyStorage to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyStorage', '$scope',
 *     function(Storage, $scope){
 *         // we can use "Storage" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyStorage as dependency but I have renamed it as Storage to use it more easily in controller code.
 *
 * # List Method
 * - {@link storage.BarneyStorage#methods_delete delete}
 * - {@link storage.BarneyStorage#methods_get get}
 * - {@link storage.BarneyStorage#methods_getMultiple getMultiple}
 * - {@link storage.BarneyStorage#methods_init init}
 * - {@link storage.BarneyStorage#methods_isLocalStorageSupported isLocalStorageSupported}
 * - {@link storage.BarneyStorage#methods_set set}
 * - {@link storage.BarneyStorage#methods_setMultiple setMultiple}
 *
 */
angular.module('barney').provider('BarneyStorage',
    ['BarneyStorageBiscuitProvider', 'BarneyStorageDepotProvider', 'BarneyStorageChickenProvider',
    function (Biscuit, Depot, Chicken) {

        var Storage = {

            selectedStorage: null,
            logger: {
                log: function(){},
                info: function(){},
                warn: function(){},
                error: function(){}
            },
            
            storages: {
                'cookie': Biscuit,
                'localStorage': Depot,
                'jsObject': Chicken
            },


            /**
             * @ngdoc function
             * @name storage.BarneyStorage#init
             * @methodOf storage.BarneyStorage
             *
             * @description 
             * This method is used to initialize the Storage module.
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

            init: function(params){
                if (params){
                    // SETUP STORAGE TYPE
                    if(!!params.type){
                        this.selectedStorage = this.storages[params.type];
                    }
                    
                    // SETUP LOGGER
                    if(!!params.logger){
                        if(params.logger === true){
                            this.logger = window.console;
                        } else {
                            this.logger = params.logger;
                        }
                    }
                }
                this.logger.log('BarneyStorage', 'init', params, this.selectedStorage, this.logger);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#set
             * @methodOf storage.BarneyStorage
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

            set: function(key, value, options){
                if(!!options && !!options.type){
                    this.storages[options.type].set(key, value, options);
                } else {
                    this.selectedStorage.set(key, value, options);
                }
                // this.selectedStorage.set(key, value, exdays);
                this.logger.log('BarneyStorage', 'set', key, value, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#get
             * @methodOf storage.BarneyStorage
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
             * Storage.get('key', {type: 'cookie'});
             * </pre>
             */

            get: function(key, options){
                var value;
                if(!!options && !!options.type){
                    value = this.storages[options.type].get(key, value, options);
                } else {
                    value = this.selectedStorage.get(key, options);
                }
                // var value = this.selectedStorage.get(key);
                this.logger.log('BarneyStorage', 'get', key, value, options);
                return value;
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#getMultiple
             * @methodOf storage.BarneyStorage
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
             *   Storage.getMultiple(['key1', 'key2', ...], {type: 'cookie'});
             * </pre>
             * 
            */

            getMultiple: function(keys, options){
                var values;
                if(!!options && !!options.type){
                    values = this.storages[options.type].getMultiple(keys, options);
                } else {
                    values = this.selectedStorage.getMultiple(keys, options);
                }
                // var values = this.selectedStorage.getMultiple(keys);
                this.logger.log('BarneyStorage', 'getMultiple', values, options);
                return values;
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#setMultiple
             * @methodOf storage.BarneyStorage
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
             *   Storage.setMultiple({'key1':1, 'key2':2, ...},{type: 'cookie'});
             * </pre>
             * 
            */

            setMultiple: function(params, options){
                if(!!options && !!options.type){
                    this.storages[options.type].setMultiple(params, options);
                } else {
                    this.selectedStorage.setMultiple(params, options);
                }
                // this.selectedStorage.setMultiple(params, exdays);
                this.logger.log('BarneyStorage', 'setMultiple', params, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#delete
             * @methodOf storage.BarneyStorage
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
             * Storage.delete('key', {type: Cookie});
             * </pre>
             * 
            */
           
            delete: function(key, options){
                if(!!options && !!options.type){
                    this.storages[options.type].delete(key, options);
                } else {
                    this.selectedStorage.delete(key, options);
                }
                // this.selectedStorage.delete(key);
                this.logger.log('BarneyStorage', 'delete', key, options);
            },

            /**
             * @ngdoc function
             * @name storage.BarneyStorage#isLocalStorageSupported
             * @methodOf storage.BarneyStorage
             *
             * @description 
             * This method is used to know if the browser support the local storage
             *
             * @example
             * <pre>
             *  if(isLocalStorageSupported()) {
             *       // store a localstorage key
             *   } else {
             *       alert('local storage is not supported');
             *   }
             * </pre>
             * 
            */
            isLocalStorageSupported: function(){
                var name = 'test';
                try {
                    localStorage.setItem(name, name);
                    localStorage.getItem(name);
                    localStorage.removeItem(name);
                    return true;
                } catch (e) {
                    return false;
                }
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
]);