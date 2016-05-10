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