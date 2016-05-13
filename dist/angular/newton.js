if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
/**
 * @ngdoc object
 * @name newton
 *
 * @description
 * Newton is the module for Newton library.
 *
 * You can use it to:
 * - track a page
 * - track an event
 * - track the timespent between two events (heartbeat, time spent on site/page)
 *
 * # Import & Usage
 * ## Vanilla JS
 * Import this single file to use Newton module, in Vanilla JS:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/base/newton.js"> 
 * </pre>
 * Now you can use global object **barney.Newton** and associated methods, described below. <br/>
 * You can start by initializing it with {@link newton#methods_init init} method.
 *
 * ## Angular
 * Import this single file to use Newton module, in Angular framework:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/angular/newton.js"> 
 * </pre>
 * Now you can import **barney** module for your Angular app.
 * <pre>
 * angular.module('yourApp', [ 'barney' ]);
 * </pre>
 * Newton module for Angular contains only {@link newton.BarneyNewton BarneyNewton service}.
 */

barney.Newton = new function(){

    var enabled = true;
    var verbose = false;
    var heartbeats = {};
    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };


    /**
     * @ngdoc function
     * @name newton#init
     * @methodOf newton
     *
     * @description 
     * Init newton module.
     *
     * @param {Object} options list of options
     * @param {boolean} [options.enabled=true] enable/disable tracking on Newton
     * @param {boolean} [options.verbose=false] enable/disable verbose mode, with logging
     * @param {Object} [options.logger={}] logging methods to use for verbose mode
     */

    this.init = function(options){
        if(options){
            if(typeof(options.enabled) !== 'undefined'){
                enabled = options.enabled;
            }
            if(typeof(options.verbose) !== 'undefined'){
                verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                logger = options.logger;
            }
        }

        if(verbose){
            logger.log('BarneyNewton', 'init', this);
        }
    };

    /**
     * @ngdoc function
     * @name newton#trackPage
     * @methodOf newton
     *
     * @description Track a page view event.
     *
     * @param {Object} options details of the page
     *
    * @example
     * # Newton trackPage 
     * Here is an example of the trackPage method.
     * <pre>
     * 
     *   barney.Newton.trackPage({
     *      title: 'Category Page Title',
     *      URL: 'category/7888'
     *  });
     *
     * </pre>
     * 
    */

    this.trackPage = function(options){
        if(enabled){
            Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
        }

        if(verbose){
            logger.log('BarneyNewton', 'track', 'pageview', options);
        }
    };

    /**
     * @ngdoc function
     * @name newton#trackEvent
     * @methodOf newton
     *
     * @description Track an event.
     *
     * @param {String} event name of the event
     * @param {Object} options parameters of the event
     *
     * @example
     * # Newton trackEvent 
     * Here is an example of the trackEvent method.
     * <pre>
     * 
     *   barney.Newton.trackEvent('Click', {
     *      category: 'Category Page',
     *      label: 'Music',
     *      valuable: 'yes'
     *  });
     *
     * </pre>
     *
    */


    this.trackEvent = function(eventName, options){
        if(enabled){
            Newton.getSharedInstance().sendEvent(eventName, Newton.SimpleObject.fromJSONObject(options));
        }

        if(verbose){
            logger.log('BarneyNewton', 'track', eventName, options);
        }
    };

    /**
     * @ngdoc function
     * @name newton#startHeartbeat
     * @methodOf newton
     *
     * @description Start a single heartbeat.
     *
     * @param {string} keyword name of the heartbeat
     * @param {Object} [options={}] parameters of the heartbeat
     *
     * @example
     * # Newton startHeartbeat 
     * Here is an example of the startHeartbeat method.
     * <pre>
     * 
     *   barney.Newton.startHeartbeat('aTestHeart', {
     *      label: 'page_title',
     *      valuable: 'no',
     *      action: 'no'
     *   });
     *
     * </pre>
    */

    this.startHeartbeat = function(keyword, options){
        if(!heartbeats[keyword]){
            if(enabled){
                Newton.getSharedInstance().timedEventStart(keyword, Newton.SimpleObject.fromJSONObject(options));
            }

            if(verbose){
                logger.log('BarneyNewton', 'heartbeat', 'start', keyword, options);
            }

            heartbeats[keyword] = true;
        } else {
            if(verbose){
                logger.warn('BarneyNewton', 'heartbeat', 'start', keyword + ' is already running');
            }
        }    
    };


    /**
     * @ngdoc function
     * @name newton#stopHeartbeat
     * @methodOf newton
     *
     * @description Stop a single heartbeat.
     *
     * @param {string} keyword name of the heartbeat
     * @param {Object} [options={}] parameters of the heartbeat
     *
    */

    this.stopHeartbeat = function(keyword, options){
        if(heartbeats[keyword]){
            if(enabled){
                Newton.getSharedInstance().timedEventStop(keyword, Newton.SimpleObject.fromJSONObject(options));
            }

            if(verbose){
                logger.log('BarneyNewton', 'heartbeat', 'stop', keyword, options);
            }

            heartbeats[keyword] = false;
        } else {
            logger.warn('BarneyNewton', 'heartbeat', 'stop', keyword + ' is not running');
        }
    };

    /**
     * @ngdoc function
     * @name newton#stopAllHeartbeat
     * @methodOf newton
     *
     * @description Stop all running heartbeats.
     *
    */

    this.stopAllHeartbeat = function(){
        if(enabled){
            for(var key in heartbeats){
                this.stopHeartbeat(key, {});
            }
        }

        if(verbose){
            logger.log('BarneyNewton', 'heartbeat', 'stop all');
        }
    };

    /**
     * @ngdoc function
     * @name newton#heartbeatsList
     * @methodOf newton
     *
     * @description Get the list of all running heartbeats.
     *
    */

    this.heartbeatsList = function(){
        return heartbeats;
    };

   /**
     * @ngdoc function
     * @name newton#isHeartbeatEnabled
     * @methodOf newton
     *
     * @description Check if an heartbeat is enabled.
     *
     * @param {string} keyword name of the heartbeat
     * @return {boolean} true if heartbeat is enabled and running, else false
     *
    */

    this.isHeartbeatEnabled = function(keyword){
        return heartbeats[keyword];
    };

};

  
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
