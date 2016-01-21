/**
 * @ngdoc object
 * @name newton.BarneyNewton
 *
 * @description
 * To use Newton service, you have to add BarneyNewton dependency to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyNewton to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyNewton', '$scope',
 *     function(Newton, $scope){
 *         // we can use "Newton" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyNewton as dependency but I have renamed it as Newton to use it more easily in controller code.
 */
angular.module('barney.newton').factory('BarneyNewton', function(){

    this.enabled = true;
    this.verbose = false;
    this.logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

     /**
     * @ngdoc function
     * @name newton.BarneyNewton#init
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to initialize the Newton module. It requires 3 parameters:
     *
     * - **enabled**: enable or disable the module (default: true)
     * - **verbose**: logs all the works done by the module (default: false)
     * - **logger**: object that logs (i.e: window.console, BarneyLogger, ...) (default: null)
     *
     * @param {Object} options (see attributes below)
     * @param {boolean} [options.enabled=true]
     *
     * - **true**: enable the module
     * - **false**: disable the module
     *
     * @param {boolean} [options.verbose=true]
     *
     * - **true**: log all the work
     * - **false**: do nothing
     *
     * @param {Object} [options.logger=null]
     *
     * Object used to log (i.e: window.console, BarneyLogger, ...)
     *
     * @example
     * # Logger 
     * Logger with window.console
     * <pre>
     *   Newton.init({
     *      enabled: true,
     *      verbose: true,
     *      logger: BarneyLogger
     *  });
     * </pre>
     * 
     * Logger with BarneyLogger
     * <pre>
     * angular.module('mock').controller('HomePageController', [
     *     'BarneyNewton', 'BarneyLogger', '$scope',
     *     function(Newton, Logger, $scope){
     *   
     *         Logger.init({ enabled: true });
     *          
     *         Newton.init({
     *             enabled: true,
     *             verbose: true,
     *             logger: Logger
     *         });
     *   
     *     }
     * ]);
     * </pre>
    */

    this.init = function(options){
        if(options){
            if(typeof(options.enabled) !== 'undefined'){
                this.enabled = options.enabled;
            }
            if(typeof(options.verbose) !== 'undefined'){
                this.verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                this.logger = options.logger;
            }
        }

        if(this.verbose){
            this.logger.log('BarneyNewton', 'init', this);
        }
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#trackPage
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to track the visited page.
     *
     * @param {Object} options Page details (i.e: title page, URL, ...)
     * @example
     * # Newton trackPage 
     * Here is an example of the trackPage method.
     * <pre>
     * 
     *   Newton.trackPage({
     *      title: 'page_pitle',
     *      URL: 'http://page_url'
     *  });
     *
     * </pre>
     * 
    */

    this.trackPage = function(options){
        if(this.verbose){
            this.logger.log('BarneyNewton', 'track', 'pageview', options);
        }

        if(this.enabled){
            Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
        }
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#trackEvent
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to track events.
     *
     * @param {string} event Generated event
     *
     * @param {Object} options Event params (i.e: event name, ...)
     * @example
     * # Newton trackEvent 
     * Here is an example of the trackEvent method.
     * <pre>
     * 
     *   Newton.trackEvent('Click', {
     *      title: 'generated_event'
     *  });
     *
     * </pre>
     * 
    */
    // traccia un evento, prende come parametri:
    // - event: nome dell'evento
    // - options: opzioni dell'evento (per esempio category e label) 
    this.trackEvent = function(event, options){
        if(this.verbose){
            this.logger.log('BarneyNewton', 'track', event, options);
        }

        if(this.enabled){
            Newton.getSharedInstance().sendEvent(event, Newton.SimpleObject.fromJSONObject(options));
        }
    };

    return this;

});