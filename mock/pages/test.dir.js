angular.module('mock').directive('infiniteScroll', 
    ['$window', 
    function($window) {

        return {
            restrict: 'A',
            scope: {
                enable: '=infiniteEnable',
                callback: '&infiniteCallback',
                offset: '@infiniteOffset'
            },
            link: function($scope, $element, $attribute) {

                if(!$scope.offset){ 
                    $scope.offset = 0;
                }

                var check = function(){
                    var windowHeight = 'innerHeight' in window ? window.innerHeight
                        : document.documentElement.offsetHeight;
                    var body = document.body, html = document.documentElement;
                    var docHeight = Math.max(body.scrollHeight,
                        body.offsetHeight, html.clientHeight,
                        html.scrollHeight, html.offsetHeight);
                    var windowBottom = windowHeight + window.pageYOffset + parseInt($scope.offset);
                    var elementHeight = $element[0].offsetHeight;

                    if(elementHeight < windowBottom || windowBottom >= docHeight){
                        $scope.enable = false;
                        $scope.callback.call()(function(){
                            $scope.enable = true;
                        });
                    }
                }
                
                $scope.$watch('enable', function(newVal, oldVal){
                    if($scope.enable){
                        check();
                    }
                });

                angular.element($window).bind('scroll', function() {
                    if($scope.enable){
                        check();
                    }
                });

            }
        };
    }
]);