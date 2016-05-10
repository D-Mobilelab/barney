if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.History = new function(){

    var previousPath = null;

    this.init = function(){
        var _this = this;
        window.addEventListener('hashchange', function(newurl, oldurl){
            if(newurl !== oldurl){
                _this.previousPath = oldurl.substr(oldurl.indexOf('#!') + 2);
            }
        }, false);
    };

    this.setPrevPath = function(path){
        previousPath = path;
    };

    this.getPrevPath = function(){
        return previousPath;
    };

};

angular.module('barney').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){

        var previousState = null;

        // OVERRIDE
        this.init = function() {
            var _this = this;
            $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                if(newurl !== oldurl){
                    _this.setPrevPath( oldurl.substr(oldurl.indexOf('#!') + 2) );
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
                if(!!previous && !!previous.$$route){
                    _this.setPrevState( previous.$$route );
                }
            });
        };

        this.setPrevPath = function(path){
            barney.History.setPrevPath(path);
        };

        this.getPrevPath = function(){
            return barney.History.getPrevPath();
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.setPrevState = function(state){
            previousState = state;
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.getPrevState = function(){
            return previousState;
        };

        // EXTENSION : NEW METHOD ONLY FOR ANGULAR
        this.goBack = function(){
            $location.url( this.getPrevPath() );
        };

        return this;

    }
]);