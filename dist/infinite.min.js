/**
 * @ngdoc directive
 * @name infinite.directive:InfiniteScroll
 *
 * @description
 * Allow infinite scroll on your page.
 *
 * To use **BarneyInfinite** directive, you have to add **infinite-scroll** 
 * to the div that will contain the element' s list  and you have to define a 
 * function that will be executed when the
 * bottom of the page will be reached. If you want to reenable **BarneyInfinite** you have
 * to pass to that function a new function that will be called when you want to 
 * reactivate the infinite scroll listener. Remember that you can pass to **BarneyInfinite**
 * also a boolean ( to make Infinite does the first call )  and an offset ( to 
 * activate **BarneyInfinite** before the reaching of the end of the page).
 *
 * @example
 *
 * In this example, I have added infinite-scroll to a div that contains an ng-repeat
 * and defined a controller to show how **BarneyInfinite** should work:
 *
 * **HTML**
 * <pre>
 *  <div infinite-scroll infinite-callback="functionToCall"  
 *   infinite-enable="flag" infinite-offset="100">
 *      <p ng-repeat="item in data">
 *           {{item}}
 *       </p>
 *  </div>
 * </pre>
 *
 * **Controller**
 * 
 *
 * <pre>
 *  $scope.flag = true; 
 *
 *  $scope.functionToCall = function(reenableInfinite){
 *
 *      // here infinite is disabled
 *
 *      // here I call an API, wait response and choose if 
 *      // re-enable infinite scroll or not
 *      callApiMethod(function(){
 *          if(youWantToReenable) {
 *              // re-enable infinite scroll
 *              reenableInfinite(); 
 *          } else {
 *              //do nothing
 *          }
 *      });
 *
 *  }
 * </pre>
 *
 *
 */

angular.module('barney').directive('infiniteScroll', 
    ['$window', '$timeout',
    function($window, $timeout) {

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
    }
]);
