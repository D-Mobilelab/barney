export default ($sce, BarneyDict) => {
    return {
        restrict: 'E',
        template: '<span ng-bind-html="value"></span>',
        replace: true,
        scope: {
            key: '@'
        },
        link: function($scope){

            $scope.value = $sce.trustAsHtml(BarneyDict.get($scope.key));
            
        }
    };
};