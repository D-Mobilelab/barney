angular.module('barney').provider('BarneyConfig', function(){   

    var config = {};     
    
    var myProvider = {

        init: function(options){
            if(options && options.config){
                config = options.config;
            }
        },

        get: function(value){
            var falseValues = ['', 0, '0', null, 'null', false, 'false'];
            value = value.toUpperCase();
            if(falseValues.indexOf(config[value]) !== -1){
                return false;
            } else {
                return config[value];
            }
        },

        list: function(){
            return config;
        }
        
    };

    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});