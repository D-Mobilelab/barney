angular.module('barney').provider('BarneyStorageChicken', function () {

    // Chicken: Object-based storage

    var Chicken = {

        get: function(key){
            return BarneyStorageChicken.get(key);
        },

        set: function(key, value){
            BarneyStorageChicken.set(key, value);
        },

        getMultiple: function(keys){
            return BarneyStorageChicken.getMultiple(keys);
        },

        setMultiple: function(params){
            BarneyStorageChicken.setMultiple(params);
        },

        delete: function(key){
            BarneyStorageChicken.delete(key);
        }
    };

    angular.extend(this, Chicken);
    this.$get = [function() {
        return this;
    }];

});