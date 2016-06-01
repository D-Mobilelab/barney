/**
 * @ngdoc filter
 * @name dict.filter:dict
 *
 * @description
 * You can get a dict value using the custom dict filter
 *
 * @example
 * <pre>
 *  // javascript
 *  BarneyDict.init({ 'existKey' : 'Hello!' });
 *
 *  // html
 *  {{'existKey' | dict}}
 *  // it prints 'Hello!'
 * </pre>
 */

angular.module('barney').filter('dict', [
    'BarneyDict', 
    function(Dict) {

        return function(key) {
            return Dict.get(key);
        };
    }
]);