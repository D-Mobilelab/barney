angular.module('barney').factory('BarneyAnalytics', [
    function(){

        this.init = function(options) {
            barney.Analytics.init(options);
        };

        this.setId = function(id){
            barney.Analytics.setId(id);
        };

        this.setDimension = function(dimensions){
            barney.Analytics.setDimension(dimensions);
        };

        this.trackPage = function(options){
            barney.Analytics.trackPage(options);
        };

        this.trackEvent = function(options){
            barney.Analytics.trackEvent(options);
        };

        return this;
    }
]);