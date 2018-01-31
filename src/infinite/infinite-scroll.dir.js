/**
 * @ngdoc directive
 * @name infinite.directive:InfiniteScroll
 *
 * @description
 * Allow infinite scroll on your page.
 *
 * To use infinite scroll, you have to add **infinite-scroll** directive
 * to the element that will contain the list of elements.
 * 
 * Furthermore, you have to pass a method to **infinite-callback** attribute: 
 * it will be executed when the bottom of the page will be reached.
 *
 * If you want to reenable infinite scroll you have get first argument of this 
 * method and call it (see example below).
 *
 * Furthermore, you can pass a boolean to **infinite-enable** to enable or disable infinite scroll; and
 * an offset to **infinite-offset** to activate infinite scroll
 * before the reaching of the end of the page.
 *
 * @example
 * In this example, I have added infinite-scroll to a div that contains an ng-repeat:
 * <pre>
 *  // HTML
 *  <div infinite-scroll infinite-callback="functionToCall"  
 *   infinite-enable="flag" infinite-offset="100">
 *      <p ng-repeat="item in data">
 *           {{item}}
 *       </p>
 *  </div>
 *
 *  // javascript
 *  $scope.flag = true; 
 *
 *  $scope.functionToCall = function(reenableInfinite){
 *
 *      // here infinite is disabled
 *
 *      // here I call an API, wait response and choose if 
 *      // re-enable infinite scroll or not
 *      callApiMethod(function(){
 *          // add elements to list
 *
 *          if(youWantToReenable) {
 *              // re-enable infinite scroll
 *              reenableInfinite(); 
 *          } else {
 *              // do nothing
 *          }
 *      });
 *
 *  }
 * </pre>
 */

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
