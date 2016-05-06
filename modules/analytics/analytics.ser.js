angular.module('barney').factory('BarneyAnalytics', [
    function(){

        this.init = function(options) {
            BarneyAnalytics.init(options);
        };

        this.setId = function(id){
            BarneyAnalytics.setId(id);
        };

        this.setDimension = function(dimensions){
            BarneyAnalytics.setDimension(dimensions);
        };

        this.trackPage = function(options){
            BarneyAnalytics.trackPage(options);
        };

        this.trackEvent = function(options){
            BarneyAnalytics.trackEvent(options);
        };

        return this;
    }
]);