/**
 * @ngdoc directive
 * @name dict.directive:dict
 * 
 * @restrict E
 *
 * @description
 * To use the directive instead of filter is useful if dictionary key contains html code.
 *
 * @example
 * <pre>
 *  // "VALUED_KEY": 'hello <b>world</b>'
 *  
 *  <dict key="VALUED_KEY"></dict>
 *  // the directive prints 'hello <b>world</b>'
 *  // if you use the filter, it prints 'hello world'
 * </pre>
 */

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