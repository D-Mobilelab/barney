angular.module('barney').provider('BarneyConfig', function(){        
    
    var myProvider = {

        init: function(options){
            BarneyConfig.init(options);
        },

        get: function(value){
            return BarneyConfig.get(value);
        },

        list: function(){
            return BarneyConfig.list();
        }
        
    };

    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});