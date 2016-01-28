angular.module('barney.infinite').directive('infiniteScroll', 
    ['$window', 
    function($window) {

        return {
            restrict: 'A',
            scope: {
                foo: '&',
                enable: '=',
                distance: '@'
            },

            link: function(scope) {

                // offset is used to activate infinite scroll before 
                // the end of the window has been reached, 
                // if exist it takes the specified value, else
                // it's equal to 0;
                var offset;

                if(scope.distance){
                    offset = parseInt(scope.distance, 10) || 0;
                } else {
                    offset = 0;
                }

                // Infinite - Scroll
                /* BarneyInfiniteScroll listens when a page is scrolled and 
                   calculates the window bottom height and the height of the 
                   document. When the windowBottom is greater than the 
                   document's height it calls the given function. 
                   Yuo can enable or disable when you want the listener 
                   simply giving to the var enable of the directive a boolean 
                   flag. Is recommended to disable the infinite scroll in the 
                   given function before executing it, and re-enable at the 
                   end of the function to re-activate the listener. 
                   Remember that you can disable infinite scroll whenever 
                   you want in your code.
                */ 
                angular.element($window).bind('scroll', function() {
                    if(scope.enable){
                        var windowHeight = 'innerHeight' in window ? window.innerHeight
                            : document.documentElement.offsetHeight;
                        var body = document.body, html = document.documentElement;
                        var docHeight = Math.max(body.scrollHeight,
                            body.offsetHeight, html.clientHeight,
                            html.scrollHeight, html.offsetHeight);
                        var windowBottom = windowHeight + window.pageYOffset;

                        if (windowBottom + offset >= docHeight ) {
                            scope.foo();
                            scope.$apply();
                        }
                    }
                });
            }
        };
    }
]);