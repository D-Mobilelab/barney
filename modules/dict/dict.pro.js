angular.module('barney').provider('BarneyDict', [
    function () {

        var myProvider = {
            
            init: function(options){
                BarneyDict.init(options);
            },

            get: function(key){
                return BarneyDict.get(key);
            },
            
            list: function(){
                return BarneyDict.list();
            }

        };

        angular.extend(this, myProvider);
        this.$get = [function() {
            return this;
        }];
    }
]);