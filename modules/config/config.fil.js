angular.module('barney').filter('config', [
    'BarneyConfig',
    function(Config) {

        return function(input) {
            return Config.get(input);
        };
        
    }
]);