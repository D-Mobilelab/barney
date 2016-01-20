/**
 * @ngdoc filter
 * @name dict.filter:dict
 *
 * @description
 * BarneyDict as a filter is useful if:
 *
 * - you want to print the value of a dictionary key in template and it doesn't contain html code.
 * - you want use a dictionary as attribute of a html tag
 *
 * (see examples below)
 *
 * @usage
 * {{ 'VALUED_KEY' | dict }}
 *
 * @example
 * In this case I use dict as a filter to print the value of a dictionary key in template and it doesn't contain html code
 * <pre>
 *   {{ 'VALUED_KEY' | dict }}
 * </pre>
 * In this case I use dict as an attribute of an html tag
 * <pre>
 *    <input type="text" value="{{ 'VALUED_KEY' | dict }}" />
 * </pre>
 */
angular.module('barney.dict').filter('dict', [
    'BarneyDict', 
    function(Dict) {

        return function(key) {
            return Dict.get(key);
        };
    }
]);