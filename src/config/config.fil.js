/**
 * @ngdoc filter
 * @name config.filter:config
 *
 * @description
 * You can get a config value using the custom config filter
 * <pre>
 *  // javascript
 *  BarneyConfig.init({ 'ENABLE_LOGIN' : 1 });
 *
 *  // html
 *  {{'ENABLE_LOGIN' | config}}
 *  // it prints 1
 * </pre>
 */

angular.module('barney').filter('config', [
    'BarneyConfig',
    function(Config) {

        return function(input) {
            return Config.get(input);
        };
        
    }
]);