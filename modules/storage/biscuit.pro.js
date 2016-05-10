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