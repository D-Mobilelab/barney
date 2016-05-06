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