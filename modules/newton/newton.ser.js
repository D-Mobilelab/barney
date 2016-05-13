/**
 * @ngdoc object
 * @name newton.BarneyNewton
 *
 * @description 
 * Angular service of {@link newton Newton} module.
 *
 * # Import & Usage
 * To use Newton service, you have to add BarneyNewton 
 * dependency to your component (directive, controller...).
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyNewton',
 *     function(BarneyNewton){
 *         // we can use "BarneyNewton" object here
 *     }
 * ]);
 * </pre>
 */

angular.module('barney').factory('BarneyNewton', function(){

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#init
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_init init} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.init = function(options){
        barney.Newton.init(options);
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#trackPage
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_trackPage trackPage} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.trackPage = function(options){
        barney.Newton.trackPage(options);
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#trackEvent
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_trackEvent trackEvent} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.trackEvent = function(event, options){
        barney.Newton.trackEvent(event, options);
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#startHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_startHeartbeat startHeartbeat} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.startHeartbeat = function(keyword, params){
        barney.Newton.startHeartbeat(keyword, params);
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#stopHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_stopHeartbeat stopHeartbeat} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.stopHeartbeat = function(keyword){
        barney.Newton.stopHeartbeat(keyword);
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#stopAllHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_stopAllHeartbeat stopAllHeartbeat} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.stopAllHeartbeat = function(){
        barney.Newton.stopAllHeartbeat();
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#heartbeatsList
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_heartbeatsList heartbeatsList} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.heartbeatsList = function(){
        return barney.Newton.heartbeatsList();
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#isHeartbeatEnabled
     * @methodOf newton.BarneyNewton
     *
     * @description Refer to {@link newton#methods_isHeartbeatEnabled isHeartbeatEnabled} method of Newton module, replacing *barney.Newton* to *BarneyNewton*.
     */
    this.isHeartbeatEnabled = function(keyword){
        return barney.Newton.isHeartbeatEnabled(keyword);
    };

    return this;
});
