angular.module('barney').provider('BarneyStorageBiscuit', function () {

    // Biscuit: cookie-based storage 

    var Biscuit = {

        get: function(key){
           return BarneyStorageBiscuit.get(key);
        },

        set: function(key, value, options){
            BarneyStorageBiscuit.set(key, value, options);
        },

        getMultiple: function(keys){
            return BarneyStorageBiscuit.getMultiple(keys);
        },

        setMultiple: function(params, options){
            BarneyStorageBiscuit.setMultiple(params, options);
        },

        delete: function(key){
            BarneyStorageBiscuit.delete(key);
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