export default ($compile) => {
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
};