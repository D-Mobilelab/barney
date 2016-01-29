/**
 * @ngdoc directive
 * @name infinite.directive:InfiniteScroll
 *
 * @description
 * Allow infinite scroll on your page.
 *
 * To use Infinite directive, you have to add **infinite-scroll** 
 * to the div that will contain the element' s list.
 *
 * In this example, I have added infinite-scroll to a div that contains an ng-repeat:
 * # HTML
 * <pre>
 *  <div infinite-scroll infinite-callback="functionToCall"  
 *   infinite-enable="flag" infinite-offset="100">
 *      <p ng-repeat="item in data">
 *           {{item}}
 *       </p>
 *  </div>
 * </pre>
 *
 * # Controller
 * 
 * To use **BarneyInfinite** you have to define a function that will be executed when the
 * bottom of the page will be reached. If you want to reenable **BarneyInfinite** you have
 * to pass to that function a new function that will be called when you want to 
 * reactivate the infinite scroll listener. Remember that you can pass to **BarneyInfinite**
 * also a boolean ( to make Infinite does the first call )  and an offset ( to 
 * activate **BarneyInfinite** before the reaching of the end of the page).
 *
 * <pre>
 *  $scope.flag = true; 
 *  $scope.data = [];
 *  var start = 0, step = 10;
 *
 *  $scope.functionToCall = function(reenableInfinite){
 *
 *      for(var i=start; i < start+step; i++){
 *          $scope.data.push(i);
 *      }
 *      start += step;
 *      if(youWantToReenable) {
 *          reenableInfinite(); 
 *      } else {
 *          //do nothing
 *       }
 *
 *  }
 * </pre>
 *
 *
 */

angular.module('barney.infinite').directive('infiniteScroll', 
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
                
                $scope.$watch('enable', function(){
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