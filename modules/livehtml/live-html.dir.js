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

                this.liveScript = function(jsLink){
                    var s = document.createElement('script');
                    s.src = jsLink;
                    document.body.appendChild(s);
                };

                this.liveJs = function(jsCode){
                    Function(jsCode)();
                };

            }
        };
    }]
);

angular.module('barney').directive('script', 
    [function() {

        return {
            restrict: 'E',
            scope: false,
            require: '?^^liveHtml',
            link: function($scope, $element, $attrs, liveHtmlCtrl) {

                // if <script> is child of live-html directive
                if(liveHtmlCtrl){

                    // if <script src="..."></script>
                    if($element[0].src){
                        liveHtmlCtrl.liveScript($element[0].src);
                    }
                    
                    // if <script>...</script>
                    if($element[0].innerHTML){
                        liveHtmlCtrl.liveJs($element[0].innerHTML);
                    }

                }

            }
        };
    }]
);
