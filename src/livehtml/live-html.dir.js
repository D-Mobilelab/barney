/**
 * @ngdoc directive
 * @name livehtml.directive:livehtml
 * 
 * @restrict E
 *
 * @description
 * With live-html directive, you can print html code, without any pre-controls.
 *
 * @example
 * <pre>
 *  // "UNSAFE_CODE": '<form action="go.php"><input type="text" name="name" /><iframe src="go.mp4" /></form>'
 *  
 *  <live-html key="UNSAFE_CODE"></live-html>
 *  // the directive prints '<form action="go.php"><input type="text" name="name" /><iframe src="go.mp4" /></form>'
 * </pre>
 */

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
