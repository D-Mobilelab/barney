angular.module('barney').provider('BarneyConfig', function(){        
    
    var myProvider = {

        init: function(options){
            barney.Config.init(options);
        },

        get: function(value){
            return barney.Config.get(value);
        },

        list: function(){
            return barney.Config.list();
        }
        
    };

    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});