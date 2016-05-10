angular.module('barney').provider('BarneyStorageChicken', function () {

    // Chicken: Object-based storage

    var Chicken = {

        get: function(key){
            return barney.StorageChicken.get(key);
        },

        set: function(key, value){
            barney.StorageChicken.set(key, value);
        },

        getMultiple: function(keys){
            return barney.StorageChicken.getMultiple(keys);
        },

        setMultiple: function(params){
            barney.StorageChicken.setMultiple(params);
        },

        delete: function(key){
            barney.StorageChicken.delete(key);
        }
    };

    angular.extend(this, Chicken);
    this.$get = [function() {
        return this;
    }];

});