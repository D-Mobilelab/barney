if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
angular.module('barney').directive('dict', [
    '$sce', 'BarneyDict', 
    function($sce, Dict) {

        return {
            restrict: 'E',
            template: '<span ng-bind-html="value"></span>',
            replace: true,
            scope: {
                key: '@'
            },
            link: function($scope){

                $scope.value = $sce.trustAsHtml(Dict.get($scope.key));
                
            }
        };
    }
]);
angular.module('barney').filter('dict', [
    'BarneyDict', 
    function(Dict) {

        return function(key) {
            return Dict.get(key);
        };
    }
]);
barney.Dict = new function(){

    var parameters = {
        showKey: false
    };

    this.init = function(options){
        if(options){
            parameters = options;
        }
    };

    this.get = function(key){
        // convert key to upper case
        key = key.toUpperCase();

        if(parameters.showKey === 'all'){

            // 'all case': 
            // valued keys : show key name
            // void keys : show key name
            return '[[' + key + ']]';

        } else if(parameters.showKey === 'missing'){

            // 'missing' case:
            // valued keys : show value of key
            // void keys : show key name
            if(!!parameters.dict[key]) {
                return parameters.dict[key];
            } else {
                return '[[' + key + ']]';
            }

        } else {

            // standard case
            // valued keys : show value of key
            // void keys : show void string
            if(!!parameters.dict[key]) {
                return parameters.dict[key];
            } else {
                return '';
            }

        }
    };
    
    this.list = function(){
        return parameters.dict;
    };
    
};
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