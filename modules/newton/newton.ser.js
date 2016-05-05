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
 * 
 * # List Method
 * - {@link newton.BarneyNewton#methods_getSingleHeartbeat getSingleHeartbeat}
 * - {@link newton.BarneyNewton#methods_heartbeatsList heartbeatsList}
 * - {@link newton.BarneyNewton#methods_init init}
 * - {@link newton.BarneyNewton#methods_startHeartbeat startHeartbeat}
 * - {@link newton.BarneyNewton#methods_stopAllHeartbeat stopAllHeartbeat}
 * - {@link newton.BarneyNewton#methods_stopHeartbeat stopHeartbeat}
 * - {@link newton.BarneyNewton#methods_trackEvent trackEvent}
 * - {@link newton.BarneyNewton#methods_trackPage trackPage}
 *
 */
angular.module('barney').factory('BarneyNewton', function(){

    this.enabled = true;
    this.verbose = false;
    this.logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    var heartbeats = {};

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

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#startHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to **send the heartbeat starting event**. 
     * Once called Newton will **send message to track the time spent on the site** with the interval specified in Newton.
     * **Is recommended to call the stopHeartbeat function when you want to stop heartbeat tracking.**   
     *
     * @param {string} keyword Newton heartbeat identifier
     *
     * @param {Object} params Newton custom_data to track what you want.
     *
     * @example
     * # Newton startHeartbeat 
     * Here is an example of the startHeartbeat method.
     * <pre>
     * 
     *   Newton.startHeartbeat('aTestHeart', {
     *      label: 'page_title',
     *      valuable: 'no',
     *      action: 'no'
     *   });
     *
     * </pre>
     * 
    */

    this.startHeartbeat = function(keyword, params){
        if(this.enabled){
            if(!heartbeats[keyword]){
                heartbeatProperties = Newton.SimpleObject.fromJSONObject(params);
                heartbeats[keyword] = {keyWord: keyword, properties: heartbeatProperties};

                if(heartbeats[keyword]){
                    Newton.getSharedInstance().timedEventStart(heartbeats[keyword].keyWord, heartbeats[keyword].properties);

                    if(this.verbose){
                        this.logger.log(heartbeats[keyword].keyWord, 'HEARTBEAT STARTED _______/\\_/\\_', heartbeats[keyword].properties);
                    }
                }
            } else {
                if(this.verbose){
                    this.logger.warn('An heartbeat with \'' + heartbeats[keyword].keyWord + '\' is already running!');
                }
            }
        }        
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#stopHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to send the heartbeat stop event. 
     * Once called Newton will **stop to track the time spent on the site**, and the heartbeat tracking will be removed
     * from the heartbeats list.
     * Before calling the stop heartbeat event **remember that the heartbeat must be started**.   
     *
     * @param {string} keyword Newton heartbeat identifier
     *
     * @example
     * # Newton stopHeartbeat 
     * Here is an example of the stopHeartbeat method.
     * <pre>
     *
     *   //after Newton.startHeartbeat(...)
     *   Newton.stopHeartbeat('aTestHeart');
     *
     * </pre>
     * 
    */

    this.stopHeartbeat = function(keyword){
        if(this.enabled){
            if(heartbeats[keyword]){
                Newton.getSharedInstance().timedEventStop(heartbeats[keyword].keyWord, heartbeats[keyword].properties);

                if(this.verbose){
                    this.logger.log(heartbeats[keyword].keyWord, 'HEARTBEAT STOPPED _/\\_/\\_______', heartbeats[keyword].properties);
                }

                var deleted = delete heartbeats[keyword];
                if(deleted && this.verbose){
                    this.logger.log('An heartbeat has Been removed from heartbeats!', heartbeats);
                }
            }
        }
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#stopAllHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to **stop all the heartbeat that are running**. 
     * You can use this method to easily stop all the heartbeat event.
     * 
     * **Is recommended to use it on the unload event of the window.**
     *
     * @example
     * # Newton stopAllHeartbeat 
     * Here is an example of the stopAllHeartbeat method.
     * <pre>
     *
     *    window.addEventListener("unload", function(){
     *       console.log('Document closed - stopping all heartbeat');
     *       Newton.stopAllHeartbeat();
     *    }, false);
     *
     * </pre>
     * 
    */

    this.stopAllHeartbeat = function(){
        if(this.enabled){
            for(var key in heartbeats){
                this.stopHeartbeat(heartbeats[key].keyWord);
            }
            if(this.verbose){
                this.logger.log('All heartbeats has been stopped!');
            }
        }
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#heartbeatsList
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method **provides you the complete list of all the running heartbeat, with their initial properties**. 
     * You can use this method to retrieve all the heartbeats information.
     * 
     * @example
     * # Newton heartbeatsList 
     * Here is an example of the heartbeatsList method.
     * <pre>
     *       //get all the heartbeats information
     *       console.log('Heartbeats list: ', Newton.heartbeatsList());
     *       
     * </pre>
     * 
    */

    this.heartbeatsList = function(){
        if(this.enabled){
            if(this.verbose){
                this.logger.log('HEARTBEAT __/\\_/\\__: ', heartbeats);
            }   

            return heartbeats;
        } else {
            return undefined;
        }
    };

    /**
     * @ngdoc function
     * @name newton.BarneyNewton#getSingleHeartbeat
     * @methodOf newton.BarneyNewton
     *
     * @description 
     * This method is used to **get a single heartbeat information, with its initial properties**. 
     * You can use this method to retrieve all the information of an heartbeat.
     * 
     * @param {string} keyword Newton heartbeat identifier
     *
     * @example
     * # Newton getSingleHeartbeat 
     * Here is an example of the getSingleHeartbeat method.
     * <pre>
     *
     *       //get all the heartbeats information
     *       console.log('Heartbeats list: ', Newton.getSingleHeartbeat('atestheart'));
     *       
     * </pre>
     * 
    */

    this.getSingleHeartbeat = function(keyword){
        if(this.enabled){
            if(this.verbose){
                this.logger.log('Single Heartbeat __/\\_/\\__: ', heartbeats[keyword]);
            }

            return heartbeats[keyword];
        } else {
            return undefined;
        }
    };
    
    return this;

});
