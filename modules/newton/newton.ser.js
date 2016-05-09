
angular.module('barney').factory('BarneyNewton', function(){

    this.init = function(options){
        BarneyNewton.init(options);
    };

    this.trackPage = function(options){
        BarneyNewton.trackPage(options);
    };

    // traccia un evento, prende come parametri:
    // - event: nome dell'evento
    // - options: opzioni dell'evento (per esempio category e label) 
    this.trackEvent = function(event, options){
        BarneyNewton.trackEvent(event, options);
    };

    this.startHeartbeat = function(keyword, params){
        BarneyNewton.startHeartbeat(keyword, params);
    };

    this.stopHeartbeat = function(keyword){
        BarneyNewton.stopHeartbeat(keyword);
    };

    this.stopAllHeartbeat = function(){
        BarneyNewton.stopAllHeartbeat();
    };

    this.heartbeatsList = function(){
        return BarneyNewton.heartbeatsList();
    };

    this.getSingleHeartbeat = function(keyword){
        return BarneyNewton.getSingleHeartbeat(keyword);
    };

    return this;
});
