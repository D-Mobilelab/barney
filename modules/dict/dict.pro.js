angular.module('barney').provider('BarneyDict', [
    function () {

        var myProvider = {
            
            init: function(options){
                barney.Dict.init(options);
            },

            get: function(key){
                return barney.Dict.get(key);
            },
            
            list: function(){
                return barney.Dict.list();
            }

        };

        angular.extend(this, myProvider);
        this.$get = [function() {
            return this;
        }];
    }
]);