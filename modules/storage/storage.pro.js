/**
 * @ngdoc object
 * @name barney.storage.BarneyStorage
 *
 * @description
 * Use Storage service
 *
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
 */
angular.module('barney.storage').provider('BarneyStorage',
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
             * @name barney.storage.BarneyStorage#init
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to initialize the Storage module.
             *
             *
             * @param {Object} params (see attributes below)
             * @param {Object} [params.type=null] Define the storage type used to save data and can be:
             *
             * - Local Storage,
             * - Cookie,
             * - jsObject
             *
             * @param {Object} [params.logger=null] Object used to log (i.e: window.console, BarneyLogger, ...)
             *
             * @example
             * # Storage Init 
             * Here is an example of the init method.
             *
             *
             * In this example I set CookieManager as default storage and BarneyLogger as default logger
             *
             * <pre>
             * 
             *   Storage.init(CookieManager, BarneyLogger);
             *
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
             * @name barney.storage.BarneyStorage#set
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to set a value in the Storage.
             *
             *
             * @param {string} key Key to identify value
             * @param {*} value Value to store
             * @param {Object} options (see param below)
             * @param {Object} [options.type=null] If defined, options.type sets value in the defined storage, 
             * else it stores in the default storage
             *
             * @example
             * # Storage set 
             * Here is an example of the set method.
             * 
             * In this example I set in cookie 
             * the value 'value' identified by the key 'key'
             * <pre>
             * 
             *   Storage.set('key', 'value', {type: Cookie});
             *
             * </pre>
             * 
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
             * @name barney.storage.BarneyStorage#get
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to get a setted value in the Storage.
             *
             *
             * @param {string} key Key to identify value
             * @param {Object} options (see param below)
             * @param {Object} [options.type=null] If defined, options.type gets value in the defined storage, 
             * else it gets in the default storage
             *
             * @example
             * # Storage get 
             * Here is an example of the get method.
             * 
             * In this example I get from cookie 
             * the value 'value' identified by the key 'key'
             * <pre>
             * 
             *   Storage.get('key', {type: Cookie}); //get the value 'value'
             *
             * </pre>
             * 
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
             * @name barney.storage.BarneyStorage#getMultiple
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to get multiple values in the Storage.
             *
             *
             * @param {array} keys Array with keys to identify values
             * @param {Object} options (see param below)
             * @param {Object} [options.type=null] If defined, options.type gets values in the defined storage, 
             * else it gets in the default storage
             *
             * @example
             * # Storage getMultiple 
             * Here is an example of the getMultiple method.
             * 
             * <pre>
             * 
             *   Storage.getMultiple(['key1', 'key2', ...], {type: Cookie});
             *
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
                this.logger.log('BarneyStorage', 'getMultiple', keys, values, options);
                return values;
            },

            /**
             * @ngdoc function
             * @name barney.storage.BarneyStorage#setMultiple
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to set multiple values in the Storage.
             *
             * @param {Object} params Object with keys and values
             * @param {Object} options (see param below)
             * @param {Object} [options.type=null] If defined, options.type sets value in the defined storage, 
             * else it stores in the default storage
             *
             * @example
             * # Storage setMultiple 
             * Here is an example of the setMultiple method.
             * 
             * <pre>
             * 
             *   Storage.setMultiple({'key1':1, 'key2':2, ...},{type: Cookie});
             *
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
             * @name barney.storage.BarneyStorage#delete
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to delete a stored value in the default Storage.
             *
             *
             * @param {string} key Key to identify value
             * @param {Object} options (see param below)
             * @param {Object} [options.type=null] If defined, options.type deletes value in the defined storage, 
             * else it deletes in the default storage
             *
             * @example
             * # Storage delete 
             * Here is an example of the delete method.
             * 
             * In this example I delete from cookie 
             * the value 'value' identified by the key 'key';
             * <pre>
             * 
             *   Storage.delete('key', {type: Cookie});
             *
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
             * @name barney.storage.BarneyStorage#isLocalStorageSupported
             * @methodOf barney.storage.BarneyStorage
             *
             * @description 
             * This method is used to know if local storage is supported.
             *
             *
             * @example
             * # Storage isLocalStorageSupported 
             * Here is an example of the isLocalStorageSupported method.
             * 
             * <pre>
             * 
             *  if(isLocalStorageSupported()) {
             *       //store something
             *   } else {
             *       alert('local storage is not supported');
             *   }
             *
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