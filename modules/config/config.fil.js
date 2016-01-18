/**
 * @ngdoc filter
 * @name barney.config.filter:config
 *
 * @description
 * You can get a config value also using a custom config filter
 *
 *
 * @usage
 * {{'ENABLE_LOGIN' | config}}
 *	// 1
 *
 */
angular.module('barney.config').filter('config', [
    'BarneyConfig',
    function(Config) {

        return function(input) {
            return Config.get(input);
        };
        
    }
]);