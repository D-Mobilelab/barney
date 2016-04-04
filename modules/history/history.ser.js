/**
 * @ngdoc object
 * @name history.BarneyHistory
 *
 * @description
 * Use History service
 *
 * To use History service, you have to add BarneyHistory dependency to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyHistory to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyHistory', '$scope',
 *     function(History, $scope){
 *         // we can use "History" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyHistory as dependency but I have renamed it as History to use it more easily in controller code.
 *
 * # List Methods:
 * 
 * - {@link history.BarneyHistory#methods_getPrevPath getPrevPath}
 * - {@link history.BarneyHistory#methods_getPrevState getPrevState}
 * - {@link history.BarneyHistory#methods_goBack goBack}
 * - {@link history.BarneyHistory#methods_init init}
 *
 */
angular.module('barney').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){
        
        return {

            previousPath: null,
            previousState: null,
            
            /**
             * @ngdoc function
             * @name history.BarneyHistory#init
             * @methodOf history.BarneyHistory
             *
             * @description 
             * When this method is called, the last visited page is saved and 
             * it can be used by get() and goBack() methods.
             *
             * @example
             * <pre>
             *   History.init();
             * </pre>
             */
            init: function(){
                var _this = this;
                $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                    if(newurl !== oldurl){
                        _this.previousPath = oldurl.substr(oldurl.indexOf('#!') + 2);
                    }
                });
                $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
                    if(!!previous && !!previous.$$route){
                        _this.previousState = previous.$$route;
                    }
                });
            },

            /**
             * @ngdoc function
             * @name history.BarneyHistory#getPrevPath
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to get the path of the last visited page.
             *
             * To use this method, the init method must be called before.
             *
             * @example
             * # History Get 
             * Here is an example of the getPrevPath method.
             * <pre>
             * 
             *   console.log( History.getPrevPath() );
             *
             * </pre>
             * 
            */
            getPrevPath: function(){
                var _this = this;
                return _this.previousPath;
            },

            /**
             * @ngdoc function
             * @name history.BarneyHistory#getPrevState
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to get the state of the last visited page.
             *
             * To use this method, the init method must be called before.
             *
             * @example
             * # History Get 
             * Here is an example of the getPrevState method.
             * <pre>
             * 
             *   console.log( History.getPrevState() );
             *
             * </pre>
             * 
            */
            getPrevState: function(){
                var _this = this;
                return _this.previousState;
            },

            /**
             * @ngdoc function
             * @name history.BarneyHistory#goBack
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to go back to the last visited page.
             *
             * To use this method, the init method must be called before.
             *
             * @example
             * # History goBack 
             * Here is an example of the goBack method.
             * <pre>
             * 
             *   History.goBack();
             *
             * </pre>
             * 
            */
            goBack: function(){
                var _this = this;
                $location.url(_this.previousPath);
            }

        };

    }
]);