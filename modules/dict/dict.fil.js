/**
 * @ngdoc filter
 * @name dict.filter:dict
 *
 * @description
 * With BarneyDict you can print the value of a dictionary key but **it hasn't to contain html code**.
 *
 * If dictionary key contains html code, use {@link dict.directive:dict dict} directive
 *
 * @usage
 * {{ 'VALUED_KEY' | dict }}
 *
 * @example
 * In this case I use it to print the value of a dictionary key in template 
 * (it hasn't to contain html code)
 * <pre>
 *   {{ 'VALUED_KEY' | dict }}
 * </pre>
 * In this case I use it to print he value of a dictionary key as an attribute of an html tag
 * (it hasn't to contain html code)
 * <pre>
 *    <input type="text" value="{{ 'VALUED_KEY' | dict }}" />
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