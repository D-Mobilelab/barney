angular.module('barney').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){

        var previousState = null;

        // OVERRIDE
        this.init = function() {
            var _this = this;
            $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                if(newurl !== oldurl){
                    _this.setPrevPath( oldurl.substr(oldurl.indexOf('#!')+2) );
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
                if(!!previous && !!previous.$$route){
                    _this.setPrevState( previous.$$route );
                }
            });
        };

        this.setPrevPath = function(path){
            BarneyHistory.setPrevPath(path);
        };

        this.getPrevPath = function(){
            return BarneyHistory.getPrevPath();
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.setPrevState = function(state){
            previousState = state;
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.getPrevState = function(dimensions){
            return previousState;
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.goBack = function(options){
            $location.url( this.getPrevPath() );
        };

        return this;

    }
]);