angular.module('barney').provider('BarneyStorage',
    ['BarneyStorageBiscuitProvider', 'BarneyStorageDepotProvider', 'BarneyStorageChickenProvider',
    function (Biscuit, Depot, Chicken) {

        var Storage = {

            init: function(params){
                BarneyStorage.init(params);
            },

            set: function(key, value, options){
                BarneyStorage.set(key, value, options);
            },

            get: function(key, options){
                return BarneyStorage.get(key, options);
            },

            getMultiple: function(keys, options){
                return BarneyStorage.getMultiple(keys, options);
            },

            setMultiple: function(params, options){
                BarneyStorage.setMultiple(params, options);
            },
            
            delete: function(key, options){
                BarneyStorage.delete(key, options);
            },

            isLocalStorageSupported: function(){
                return BarneyStorage.isLocalStorageSupported();
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