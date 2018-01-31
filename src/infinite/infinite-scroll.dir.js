import angular from 'angular';

export default ($window, $timeout) => {
    return {
        restrict: 'A',
        scope: {
            enable: '=infiniteEnable',
            callback: '&infiniteCallback',
            offset: '@infiniteOffset'
        },
        link: function($scope, $element) {

            // offset is used to activate infinite scroll before 
            // the end of the window has been reached, 
            // if exist it takes the specified value, else
            // it's equal to 0;
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
                var windowBottom = windowHeight + window.pageYOffset + parseInt($scope.offset, 10);
                var elementHeight = $element[0].offsetHeight;
                
                if(elementHeight < windowBottom || windowBottom >= docHeight){
                    $scope.enable = false;

                    $scope.callback.call()(function(){
                        $timeout(function(){
                            $scope.enable = true;
                        }, 1);
                    });
                }
            };
            
            var checkIfEnabled = function(){
                if($scope.enable){
                    check();
                }
            };
            
            $scope.$watch('enable', function(){
                checkIfEnabled();
            });

            angular.element($window).bind('scroll', checkIfEnabled);

            $scope.$on('$destroy', function(){
                angular.element($window).unbind('scroll', checkIfEnabled);
            });

        }
    };
};