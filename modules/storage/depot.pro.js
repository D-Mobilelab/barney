angular.module('barney').provider('BarneyStorageDepot', function () {

    // Depot: localStorage-based storage 

    var Depot = {
        get: function(key){
            return BarneyStorageDepot.get(key);
        },

        set: function(key, value){
            BarneyStorageDepot.set(key, value);
        },

        getMultiple: function(keys){
          return BarneyStorageDepot.getMultiple(keys);
        },

        setMultiple: function(params){
            BarneyStorageDepot.setMultiple(params);
        },

        delete: function(key){
            BarneyStorageDepot.delete(key);
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