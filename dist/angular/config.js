if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
angular.module('barney').filter('config', [
    'BarneyConfig',
    function(Config) {

        return function(input) {
            return Config.get(input);
        };
        
    }
]);
barney.Config = new function(){

    this.init = function(options){
        if(options && options.config){
            this.config = options.config;
        }
    };

    this.get = function(value){
        var falseValues = ['', 0, '0', null, 'null', false, 'false'];
        value = value.toUpperCase();
        if(falseValues.indexOf(this.config[value]) !== -1){
            return false;
        } else {
            return this.config[value];
        }
    };

    this.list = function(){
        return this.config;
    };

};
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