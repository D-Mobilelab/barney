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