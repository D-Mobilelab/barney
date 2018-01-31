/**
 * @ngdoc directive
 * @name livehtml.directive:livehtml
 * 
 * @restrict A
 *
 * @description
 * With live-html directive, you can print html code without any pre-controls.
 *
 * @example
 * <pre>
 *  <div live-html="UNSAFE_CODE"></div>
 *
 * <!--
 *  if UNSAFE_CODE is 
 *  '<form action="go.php"><input type="text" name="name" /><iframe src="go.mp4" /></form>'
 *  then the directive prints 
 *  '<form action="go.php"><input type="text" name="name" /><iframe src="go.mp4" /></form>'
 *
 *  if UNSAFE_CODE is 
 *  '<script src="widget.js"></script>'
 *  then the directive loads widget.js
 *
 *  if UNSAFE_CODE is 
 *  '<script>window.alert('test');</script>'
 *  then the directive executes javascript code inside <script> tag (window.alert)
 * -->
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
            controller: function($scope, $element) {

                $scope.$watch('liveHtml', function(liveHtml) {
                    if(liveHtml){
                        $element.html(liveHtml);
                        $compile($element.contents())($scope.$parent);
                    }
                });

                this.liveScript = function(oldElem){
                    var newEl = document.createElement('script');
                    for (k = 0; k < oldElem.attributes.length; k++) {
                        newEl.setAttribute(oldElem.attributes[k].name, oldElem.attributes[k].value);
                    }
                    oldElem.parentElement.replaceChild(newEl, oldElem);
                };

                this.liveJs = function(scriptElem){
                    Function(scriptElem.innerHTML)();    // eslint-disable-line no-new-func
                };

            }
        };
    }]
);
