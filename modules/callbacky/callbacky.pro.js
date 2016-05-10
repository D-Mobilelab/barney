angular.module('barney').provider('BarneyCallbacky', function () {

    var myProvider = {

        init: function(options){
            barney.Callbacky.init(options);
        },

        bind: function(key, method){
            barney.Callbacky.bind(key, method);
        }, 

        trigger: function(key, arg){
            barney.Callbacky.trigger(key, arg);
        },

        clean: function(key){
            barney.Callbacky.clean(key);
        }

    };
    
    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});