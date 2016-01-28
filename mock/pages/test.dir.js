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
                
                $scope.$watch('enable', function(newVal, oldVal){
                    console.log("directive value: ", newVal);
                    if(newVal){

                        var windowHeight = 'innerHeight' in window ? window.innerHeight
                            : document.documentElement.offsetHeight;
                        var body = document.body, html = document.documentElement;
                        var docHeight = Math.max(body.scrollHeight,
                            body.offsetHeight, html.clientHeight,
                            html.scrollHeight, html.offsetHeight);
                        var windowBottom = windowHeight + window.pageYOffset;
                        var elementHeight = $element[0].offsetHeight

                        console.log("directive heights - element:", elementHeight, " window:", windowBottom, "docHeight:", docHeight);
                        if(elementHeight < windowBottom){
                            console.log("directive trigger!!!");
                            $scope.callback();
                            // count--;
                        } else {
                            enableScrollListener();
                        }
                    }
                });

                var enableScrollListener = function(){
                    angular.element($window).bind('scroll', function() {
                        console.log("scroll enable", $scope.enable);
                        if($scope.enable){
                            var windowHeight = 'innerHeight' in window ? window.innerHeight
                                : document.documentElement.offsetHeight;
                            var body = document.body, html = document.documentElement;
                            var docHeight = Math.max(body.scrollHeight,
                                body.offsetHeight, html.clientHeight,
                                html.scrollHeight, html.offsetHeight);
                            var windowBottom = windowHeight + window.pageYOffset;
                            console.log("scroll values", windowBottom, docHeight);

                            if (windowBottom >= docHeight ) {
                                console.log("scroll trigger!!!");
                                $scope.callback();
                            }
                        }
                    });
                }

            }
        };
    }
]);