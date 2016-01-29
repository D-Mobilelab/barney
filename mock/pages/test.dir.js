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

                var localEnable = true;

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

                    // if($scope.enable && (elementHeight<windowBottom || windowBottom >= docHeight)){
                    if($scope.enable && localEnable && (elementHeight<windowBottom || windowBottom >= docHeight)){
                        localEnable = false;
                        $scope.callback.call()(function(){
                            localEnable = true;
                        });
                        // $scope.callback("pippo");
                    }
                }
                
                $scope.$watch('enable', function(newVal, oldVal){
                    if($scope.enable && localEnable){
                        check();
                    }
                });

                angular.element($window).bind('scroll', function() {
                    if($scope.enable && localEnable){
                        check();
                    }
                });

            }
        };
    }
]);