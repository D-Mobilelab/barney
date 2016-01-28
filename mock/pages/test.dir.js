angular.module('mock').directive('test', 
    ['$window', 
    function($window) {

        return {
            restrict: 'A',
            scope: {
                enable: '=',
                callback: '&'
            },
            link: function($scope, $element, $attribute) {

                var check = function(){
                    var windowHeight = 'innerHeight' in window ? window.innerHeight
                        : document.documentElement.offsetHeight;
                    var body = document.body, html = document.documentElement;
                    var docHeight = Math.max(body.scrollHeight,
                        body.offsetHeight, html.clientHeight,
                        html.scrollHeight, html.offsetHeight);
                    var windowBottom = windowHeight + window.pageYOffset;
                    var elementHeight = $element[0].offsetHeight;

                    console.log("CHECK", $scope.enable, (elementHeight<windowBottom || windowBottom >= docHeight), " >> ", $scope.enable && (elementHeight<windowBottom || windowBottom >= docHeight));

                    if($scope.enable && (elementHeight<windowBottom || windowBottom >= docHeight)){
                        $scope.callback();
                    }
                }
                
                $scope.$watch('enable', function(newVal, oldVal){
                    check();
                });

                angular.element($window).bind('scroll', function() {
                    check();
                });

            }
        };
    }
]);