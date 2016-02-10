/**
 * @ngdoc object
 * @name analytics.BarneyAnalytics
 *
 * @description
 * Track pageview and event, set custom dimensions and id
 *
 * To use Analytics service, you have to add BarneyAnalytics 
 * dependency to your component (directive, controller...).
 * In this example, I have added dependency of BarneyAnalytics to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyAnalytics', '$scope',
 *     function(Analytics, $scope){
 *         // we can use "Analytics" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyAnalytics as dependency but I have renamed it as Analytics 
 * to use it more easily in controller code.
 *
 * # List Method:
 * 
 * - {@link analytics.BarneyAnalytics#methods_init init}
 * - {@link analytics.BarneyAnalytics#methods_setDimension setDimension}
 * - {@link analytics.BarneyAnalytics#methods_setId setId}
 * - {@link analytics.BarneyAnalytics#methods_trackEvent trackEvent}
 * - {@link analytics.BarneyAnalytics#methods_trackPage trackPage}
 *
 */

angular.module('barney').factory('BarneyAnalytics', [
    function(){
        this.dimensions = {};
        this.enabled = true;
        this.verbose = false;
        this.logger = {
            log: function() {},
            info: function() {},
            warn: function() {},
            error: function() {}
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#init
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Init analytics service
         *
         * @param {Object} options (see attributes below)
         * @param {boolean} [options.enabled=true] enable/disable tracking on Google Analytics
         * @param {boolean} [options.verbose=false] enable/disable verbose mode, with logging
         * @param {Object} [options.logger=Object()] logging methods to use for verbose mode (see example below)
         * @param {Object} [options.dimensions=Object()] list of custom dimensions 
         * that will be used in the app, where
         
         * - *key*: custom dimension name
         * - *value*: slot id
         *
         * @example
         * # Logger 
         * Logger with window.console
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         *     'BarneyAnalytics', '$window', '$scope',
         *     function(Analytics, $window, $scope){
         *   
         *         Analytics.init({
         *             verbose: true,
         *             logger: $window.console
         *         });
         *   
         *     }
         * ]);
         * </pre>
         *
         * Logger with BarneyLogger
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         *     'BarneyAnalytics', 'BarneyLogger', '$scope',
         *     function(Analytics, Logger, $scope){
         *   
         *         Logger.init({ enabled: true });
         *          
         *         Analytics.init({
         *             verbose: true,
         *             logger: Logger
         *         });
         *   
         *     }
         * ]);
         * </pre>
         *
         * # Custom Dimensions
         * In analytics initialization phase, you have to define all custom dimensions 
         * that you will use in application.
         *
         * ***Init method doesn't set custom dimension on Google Analytics, it only saves 
         * custom dimension for future use (for example in event tracking).***
         *
         * You have to pass a pair (custom dimension name, slot id), where slot id is the slot 
         * of the custom dimension assigned from Google Analytics before.
         *
         * In this example, I set two custom dimensions ("UserStatus" with slot number 1 
         * and "Valuable" with slot number 5):
         * <pre>
         * Analytics.init({
         *     dimensions: {
         *         'UserStatus' : 1,
         *         'Valuable' : 5
         *     }
         * });
         * </pre>
         */
        this.init = function(options) {
            if(options) {
                if(options.dimensions){
                    this.dimensions = options.dimensions;
                }
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
                this.logger.log('BarneyAnalytics', 'init', this);
            }
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#setId
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Set analytics user id
         *
         * @param {string} id user id
         */
        this.setId = function(id){
            if(id){
                if(this.verbose){
                    this.logger.log('BarneyAnalytics', 'set id', id);
                }

                if(this.enabled){
                    ga('set', '&uid', id);
                }
            }
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#setDimension
         * @methodOf analytics.BarneyAnalytics
         *
         * @description 
         * Set a user/session (not hit) custom dimension.
         *
         * @param {Array[Object]} dimensions where:
         * - *key*: custom dimension name
         * - *value*: custom dimension value
         *
         * @example
         * **The custom dimension has to be defined in init method before** 
         * and, after, you have to use same custom dimension name.
         *
         * For example, in the following code, I set *UserStatus* on slot number 1 and 
         * I assigned it value *logged*:
         * <pre>
         * // before, I save UserStatus custom dimension with slot "1"
         * Analytics.init({
         *     dimensions: {
         *         'UserStatus' : 1
         *     }
         * });
         *   
         * // after, I set custom dimension with value "logged"
         * Analytics.setDimension({
         *     'UserStatus' : 'logged'
         * });
         * </pre>
         */
        this.setDimension = function(dimensions){
            if(dimensions){
                var key, slot, value;
                for(key in dimensions){
                    slot = this.dimensions[key];
                    value = dimensions[key];

                    if(this.verbose){
                        this.logger.log('BarneyAnalytics', 'set dimension', slot, value);
                    }

                    if(this.enabled){
                        ga('set', 'dimension' + slot, value);
                    }
                }
            }
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#trackPage
         * @methodOf analytics.BarneyAnalytics
         *
         * @description To track a pageview
         *
         * @param {object} options (see attributes below)
         * @param {string} options.page event page (e.g. '/category/7888')
         * @param {string} options.title event page title (e.g. 'Home Page')
         * @param {Array[Object]} options.dimensions where:
         * - *key*: custom dimension name
         * - *value*: custom dimension value
         */
        this.trackPage = function(options){
            var properties = { 
                'hitType': 'pageview'
            };

            if(options.page){
                properties.page = options.page;
            }
            if(options.title){
                properties.title = options.title;
            }
            if(options.dimensions){
                var key, slot, value;
                for(key in options.dimensions){
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }

            if(this.verbose){
                this.logger.log('BarneyAnalytics', 'track pageview', properties);
            }

            if(this.enabled){
                ga('send', properties);
            }
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#trackEvent
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Track an event
         *
         * @param {Object} options (see attributes below)
         * @param {string} options.category event category
         * @param {string} options.action event action
         * @param {string} options.label event label
         * @param {integer} options.value event value
         * @param {Array[Object]} options.dimensions 
         * - *key*: custom dimension name
         * - *value*: custom dimension value
         *
         * @example
         * <pre>
         * Analytics.trackEvent({
         *     category: 'UI',
         *     action: 'open',
         *     label: 'menu',
         *     value: 7,
         *     dimensions: {
         *         'Valuable': 'yes'
         *     }
         * });
         * </pre>
         * Note: the custom dimension (in this example Valuable) has to defined in init method before and you have to use same custom dimension name.
         */
        this.trackEvent = function(options){
            var properties = { 
                'hitType': 'event'
            };

            if(options.category){
                properties.eventCategory = options.category;
            }
            if(options.action){
                properties.eventAction = options.action;
            }
            if(options.label){
                properties.eventLabel = options.label;
            }
            if(options.value){
                properties.eventValue = options.value;
            }
            if(options.dimensions){
                var key, slot, value;
                for(key in options.dimensions){
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }

            if(this.verbose){
                this.logger.log('BarneyAnalytics', 'track event', properties);
            }

            if(this.enabled){
                ga('send', properties);
            }
        };

        return this;
    }
]);