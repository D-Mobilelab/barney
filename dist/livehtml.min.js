angular.module('barney').directive('liveHtml', 
    ['$compile',
    function($compile) {

        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element) {

                var unbindWatcher = $scope.$watch('content', function(content) {
                    if(content){
                        $element.html(content);
                        $compile($element.contents())($scope);
                        unbindWatcher();
                    }
                });

            }
        };
    }]
);