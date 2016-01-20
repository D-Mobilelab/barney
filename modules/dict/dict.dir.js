/**
 * @ngdoc directive
 * @name dict.directive:dict
 * 
 * @restrict E
 *
 * @description
 * To use BarneyDict as a directive you can use it in your template files (html).
 *
 * It's useful if you want to print the value of a dictionary key in template and it contains html code.
 *
 * @usage
 * <dict key="VALUED_KEY"></dict>
 * 
 * @example
 * <pre>
 * // "VALUED_KEY": 'hello <b>world</b>'
 * <dict key="VALUED_KEY"></dict>
 * </pre>
 * it prints:
 * <pre>
 *   <span>hello <b>world</b></span>
 * </pre>
 */
angular.module('barney.dict').directive('dict', [
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