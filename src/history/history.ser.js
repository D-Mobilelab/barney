/**
 * @ngdoc object
 * @name history.BarneyHistory
 *
 * @description
 * To use History service, you have to add BarneyHistory dependency to your component (i.e: directive, controller...):
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyHistory', '$scope',
 *     function(BarneyHistory, $scope){
 *         // we can use "BarneyHistory" object here
 *     }
 * ]);
 * </pre>
 */

angular.module('barney').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){

        var previousPath = null;
        var previousState = null;

        var setPrevPath = function(path){
            previousPath = path;
        };

        var setPrevState = function(state){
            previousState = state;
        };

        /**
         * @ngdoc function
         * @name history.BarneyHistory#init
         * @methodOf history.BarneyHistory
         *
         * @description 
         * When this method is called, the last visited page is saved and 
         * it can be used by getPrevPath(), getPrevState() and goBack() methods.
         *
         * @example
         * <pre>
         *  History.init();
         * </pre>
         */
        this.init = function() {
            var _this = this;
            $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                if(newurl !== oldurl){
                    setPrevPath( oldurl.substr(oldurl.indexOf('#!') + 2) );
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
                if(!!previous && !!previous.$$route){
                    setPrevState( previous.$$route );
                }
            });
        };

        /**
         * @ngdoc function
         * @name history.BarneyHistory#getPrevPath
         * @methodOf history.BarneyHistory
         *
         * @description 
         * This method is used to get the path of the last visited page.
         *
         * *To use this method, the init method must be called before.*
         *
         * @example
         * <pre>
         *  // page: '#!/home'
         *  History.init();
         *
         *  // change page to '#!/news'
         *
         *  History.getPrevPath();
         *  // it returns '#!/home'
         * </pre>
         */
        this.getPrevPath = function(){
            return previousPath;
        };

        /**
         * @ngdoc function
         * @name history.BarneyHistory#getPrevState
         * @methodOf history.BarneyHistory
         *
         * @description 
         * This method is used to get the state of the last visited page.
         *
         * *To use this method, the init method must be called before.*
         *
         * @example
         * <pre>
         *  // state: 'home'
         *  History.init();
         *
         *  // change state to 'news'
         *
         *  History.getPrevState();
         *  // it returns 'home'
         * </pre>
         */
        this.getPrevState = function(){
            return previousState;
        };

        /**
         * @ngdoc function
         * @name history.BarneyHistory#goBack
         * @methodOf history.BarneyHistory
         *
         * @description 
         * This method is used to go back to the last visited page.
         *
         * *To use this method, the init method must be called before.*
         *
         * @example
         * <pre>
         *  // page: '#!/home'
         *  History.init();
         *
         *  // change page to '#!/news'
         *
         *  History.goBack();
         *  // it returns to '#!/home'
         * </pre>
         */
        this.goBack = function(){
            $location.url( this.getPrevPath() );
        };

        return this;

    }
]);