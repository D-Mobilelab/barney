angular.module('barney.dict').filter('dict', [
    'BarneyDict', 
    function(Dict) {

        return function(key) {
            return Dict.get(key);
        };
    }
]);