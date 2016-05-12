/**
 * @ngdoc object
 * @name newton
 *
 * @description
 * Newton is the module for Newton.
 *
 * You can use it to:
 * - track a page
 * - track an event
 * - track the timespent on full website or page
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
     * Init newton service.
     *
     * - **enabled**: enable or disable the module (default: true)
     * - **verbose**: logs all the works done by the module (default: false)
     * - **logger**: object that logs (i.e: window.console, BarneyLogger, ...) (default: null)
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
     * @param {Object} options Page details (i.e: title page, URL, ...)
     *
    * @example
     * # Newton trackPage 
     * Here is an example of the trackPage method.
     * <pre>
     * 
     *   barney.Newton.trackPage({
     *      title: 'page_pitle',
     *      URL: 'http://page_url'
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
     * @param {Object} options Event details (i.e: ClickEvent, ShareEvent, ...)
     *
     * @example
     * # Newton trackEvent 
     * Here is an example of the trackEvent method.
     * <pre>
     * 
     *   barney.Newton.trackEvent('Click', {
     *      title: 'generated_event'
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
     * @description Start a single Heartbeat.
     *
     * @param {string} keyword Heartbeat name
     * @param {Object} options Heartbeat details
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
     * @description Stop a single Heartbeat.
     *
     * @param {string} keyword Heartbeat name
     * @param {Object} options Heartbeat details (can be also an empty object)
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
     * @description Check if an heartbeat is running or not, returning true or false.
     *
     * @param {string} keyword Heartbeat name
     *
    */

    this.isHeartbeatEnabled = function(keyword){
        return heartbeats[keyword];
    };

};

  