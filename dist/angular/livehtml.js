if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
angular.module('barney').directive('liveHtml', 
    ['$compile',
    function($compile) {

        return {
            restrict: 'A',
            scope: {
                liveHtml: '='
            },
            link: function($scope, $element) {

                var unbindWatcher = $scope.$watch('liveHtml', function(liveHtml) {
                    if(liveHtml){
                        $element.html(liveHtml);
                        $compile($element.contents())($scope.$parent);
                        unbindWatcher();
                    }
                    
                });

            }
        };
    }]
);
