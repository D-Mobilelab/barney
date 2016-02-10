/**
 * @ngdoc filter
 * @name config.filter:config
 *
 * @description
 * You can get a config value also using a custom config filter
 *
 *
 * @usage
 * {{'ENABLE_LOGIN' | config}}
 */
angular.module('barney').filter('config', [
    'BarneyConfig',
    function(Config) {

        return function(input) {
            return Config.get(input);
        };
        
    }
]);