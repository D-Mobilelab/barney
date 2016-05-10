
angular.module('barney').factory('BarneyNewton', function(){

    this.init = function(options){
        barney.Newton.init(options);
    };

    this.trackPage = function(options){
        barney.Newton.trackPage(options);
    };

    this.trackEvent = function(event, options){
        barney.Newton.trackEvent(event, options);
    };

    this.startHeartbeat = function(keyword, params){
        barney.Newton.startHeartbeat(keyword, params);
    };

    this.stopHeartbeat = function(keyword){
        barney.Newton.stopHeartbeat(keyword);
    };

    this.stopAllHeartbeat = function(){
        barney.Newton.stopAllHeartbeat();
    };

    this.heartbeatsList = function(){
        return barney.Newton.heartbeatsList();
    };

    this.getSingleHeartbeat = function(keyword){
        return barney.Newton.getSingleHeartbeat(keyword);
    };

    return this;
});
