angular.module('barney').provider('BarneyCallbacky', function () {

    var myProvider = {

        init: function(options){
            BarneyCallbacky.init(options);
        },

        bind: function(key, method){
            BarneyCallbacky.bind(key, method);
        }, 

        trigger: function(key, arg){
            BarneyCallbacky.trigger(key, arg);
        },

        clean: function(key){
            BarneyCallbacky.clean(key);
        }

    };
    
    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});