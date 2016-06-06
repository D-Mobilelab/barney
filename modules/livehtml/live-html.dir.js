angular.module('barney').directive('liveHtml', 
    ['$compile',
    function($compile) {

        return {
            restrict: 'A',
            scope: {
                liveHtml: '='
            },
            link: function($scope, $element) {

                $scope.$watch('liveHtml', function(liveHtml) {
                    if(liveHtml){
                        $element.html(liveHtml);
                        $compile($element.contents())($scope.$parent);
                    }
                });

            }
        };
    }]
);

angular.module('barney').directive('liveScript', 
    [function() {

        return {
            restrict: 'A',
            scope: false,
            link: function($scope, $element) {

                var s = document.createElement('script');
                s.src = $element[0].src;
                document.body.appendChild(s);

            }
        };
    }]
);

angular.module('barney').directive('liveJs', 
    [function() {

        return {
            restrict: 'A',
            scope: false,
            link: function($scope, $element) {

                var code = $element[0].innerHTML;
                var f = new Function(code);
                f();

            }
        };
    }]
);