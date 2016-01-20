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
 */
angular.module('barney.history').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){
        
        return {

            previousPath: null,
            
            /**
             * @ngdoc function
             * @name history.BarneyHistory#init
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to initialize the History module.
             *
             * @example
             * # History Init 
             * Here is an example of the init method.
             * <pre>
             * 
             *   History.init();
             *
             * </pre>
             * 
            */
            init: function(){
                var _this = this;
                $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                    if(newurl !== oldurl){
                        _this.previousPath = oldurl.substr(oldurl.indexOf('#!') + 2);
                    }
                });
            },

            /**
             * @ngdoc function
             * @name history.BarneyHistory#get
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to get the URL of the last visited page.
             *
             * @example
             * # History Get 
             * Here is an example of the get method.
             * <pre>
             * 
             *   console.log( History.get() );
             *
             * </pre>
             * 
            */
            get: function(){
                var _this = this;
                return _this.previousPath;
            },

            /**
             * @ngdoc function
             * @name history.BarneyHistory#goBack
             * @methodOf history.BarneyHistory
             *
             * @description 
             * This method is used to go back to the last visited page.
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