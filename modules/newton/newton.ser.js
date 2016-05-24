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
 * - {@link newton.BarneyNewton#methods_customLogin customLogin}
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
angular.module('barney').factory('BarneyNewton', 
    ['$q', function($q){

        var enabled = true;
        var verbose = false;
        var logger = {
            log: function(){},
            info: function(){},
            warn: function(){},
            error: function(){}
        };

        var heartbeats = {};
        var defer = $q.defer();

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
         * @param {Object} [options.logger={}] Object used to log (i.e: window.console, BarneyLogger, ...)
         * @param {string} options.secretid secret id
         *
         * @example
         * # Logger 
         * Logger with window.console
         * <pre>
         *   Newton.init({
         *      enabled: true,
         *      verbose: true,
         *      logger: BarneyLogger,
         *      secretid: '<local_host>'
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
         *             logger: Logger,
         *             secretid: '<local_host>'
         *         });
         *   
         *     }
         * ]);
         * </pre>
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
                logger.log('BarneyNewton', 'init', options);
            }

            if(enabled && typeof(options.secretid) !== 'undefined'){
                Newton.getSharedInstanceWithConfig(options.secretid);
            }
        };

        /**
         * @ngdoc function
         * @name newton.BarneyNewton#customLogin
         * @methodOf newton.BarneyNewton
         *
         * @description 
         * This method is used to make custom login on Newton. <br/>
         * It's mandatory call this method, for all other methods.
         *
         * @param {Object} options (see attributes below)
         * @param {boolean} options.logged indicates if user is logged
         * @param {string} options.userid user id (only if user is logged)
         * @param {Object} options.userprops user properties (only if user is logged)
         * @param {function} options.callback callback called when login is successful (both for logged and unlogged)
         *
         * @example
         * <pre>
         *   Newton.customLogin({
         *      logged: true,
         *      userprops: { msisdn: '+39123456789' },
         *      callback: function(){ console.log('login successful') },
         *      userid: '123456789'
         *  });
         *
         *   Newton.customLogin({
         *      logged: false,
         *      callback: function(){ console.log('user is not logged') }
         *  });
         * </pre>
         */
        this.customLogin = function(options){
            if(verbose){
                logger.log('BarneyNewton', 'customLogin', options);
            }

            if(enabled){
                if(options.logged){
                    Newton.getSharedInstance().getLoginBuilder()
                        .setCustomData( Newton.SimpleObject.fromJSONObject(options.userprops) )
                        .setOnFlowCompleteCallback( function(){
                            options.callback.call();
                            defer.resolve(true);
                        })
                        .setCustomID(options.userid)
                        .getCustomLoginFlow()
                        .startLoginFlow();
                } else {
                    defer.resolve(true);
                }
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
            defer.promise.then(function(){
                if(verbose){
                    logger.log('BarneyNewton', 'track pageview', options);
                }

                if(enabled){
                    Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
                }
            });
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
            defer.promise.then(function(){
                if(verbose){
                    logger.log('BarneyNewton', 'track event', event, options);
                }

                if(enabled){
                    Newton.getSharedInstance().sendEvent(event, Newton.SimpleObject.fromJSONObject(options));
                }
            });
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
            defer.promise.then(function(){
                if(verbose){
                    logger.log('BarneyNewton', 'start heartbeat', keyword, params);
                }

                if(enabled){
                    if(!heartbeats[keyword]){
                        heartbeatProperties = Newton.SimpleObject.fromJSONObject(params);
                        heartbeats[keyword] = {keyWord: keyword, properties: heartbeatProperties};

                        if(heartbeats[keyword]){
                            Newton.getSharedInstance().timedEventStart(heartbeats[keyword].keyWord, heartbeats[keyword].properties);
                        }
                    } else {
                        if(verbose){
                            logger.warn('BarneyNewton', 'start heartbeat', 'An heartbeat called \'' + heartbeats[keyword].keyWord + '\' is already running!');
                        }
                    }
                }   
            });   
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
            defer.promise.then(function(){
                if(verbose){
                    logger.log('BarneyNewton', 'stop heartbeat', keyword);
                }

                if(enabled){
                    if(heartbeats[keyword]){
                        Newton.getSharedInstance().timedEventStop(heartbeats[keyword].keyWord, heartbeats[keyword].properties);
                        delete heartbeats[keyword];
                    } else {
                        if(verbose){
                            logger.warn('BarneyNewton', 'stop heartbeat', 'An heartbeat called \'' + heartbeats[keyword].keyWord + '\' doesn\'t exist!');
                        }
                    }
                }
            });
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
            if(verbose){
                logger.log('BarneyNewton', 'stop all heartbeat');
            }

            if(enabled){
                for(var key in heartbeats){
                    this.stopHeartbeat(heartbeats[key].keyWord);
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
            if(enabled){
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
            if(enabled){
                return heartbeats[keyword];
            } else {
                return undefined;
            }
        };
        
        return this;

    }]
);