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