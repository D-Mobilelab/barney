if(!barney) { var barney = {}; }
/**
 * @ngdoc object
 * @name analytics
 *
 * @description
 * Analytics is the module for Google Analytics.
 *
 * You can use it to:
 * - set user id
 * - set a custom dimension
 * - track a page
 * - track an event
 *
 * # Import & Usage
 * ## Vanilla JS
 * Import this single file to use Analytics module, in Vanilla JS:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/base/analytics.js"> 
 * </pre>
 * Now you can use global object **barney.Analytics** and associated methods, described below. <br/>
 * You can start by initializing it with {@link analytics#methods_init init} method.
 *
 * ## Angular
 * Import this single file to use Analytics module, in Angular framework:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/angular/analytics.js"> 
 * </pre>
 * Now you can import **barney** module for your Angular app.
 * <pre>
 * angular.module('yourApp', [ 'barney' ]);
 * </pre>
 * Analytics module for Angular contains only {@link analytics.BarneyAnalytics BarneyAnalytics service}.
 */

barney.Analytics = new function(){

    var dimensions = {};
    var enabled = true;
    var verbose = false;
    var logger = {
        log: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
    };

    /**
     * @ngdoc function
     * @name analytics#init
     * @methodOf analytics
     *
     * @description Init analytics module.
     *
     * @param {Object} options list of options
     * @param {boolean} [options.enabled=true] enable/disable tracking on Google Analytics
     * @param {boolean} [options.verbose=false] enable/disable verbose mode, with logging
     * @param {Object} [options.logger={}] logging methods to use for verbose mode
     * @param {Object} [options.dimensions={}] list of custom dimensions that will be used in the app, where *key* is custom dimension name and *value* is slot id
     *
     * @example
     * # Logger 
     * Logger with window.console
     * <pre>
     * barney.Analytics.init({
     *      verbose: true,
     *      logger: $window.console
     * });
     * </pre>
     *
     * Logger with BarneyLogger
     * <pre>
     * barney.logger.init({ enabled: true });
     *          
     * barney.Analytics.init({
     *      verbose: true,
     *      logger: barney.logger
     * });
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
     * barney.Analytics.init({
     *     dimensions: {
     *         UserStatus : 1,
     *         Valuable : 5
     *     }
     * });
     * </pre>
     */
    this.init = function(options) {
        if(options) {
            if(options.dimensions){
                dimensions = options.dimensions;
            }
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
            logger.log('BarneyAnalytics', 'init', this);
        }
    };

    /**
     * @ngdoc function
     * @name analytics#setId
     * @methodOf analytics
     *
     * @description Set analytics user id
     *
     * @param {string} id user id
     */
    this.setId = function(id){
        if(id){
            if(enabled){
                ga('set', '&uid', id);
            }

            if(verbose){
                logger.log('BarneyAnalytics', 'set id', id);
            }
        }
    };

    /**
     * @ngdoc function
     * @name analytics#setDimension
     * @methodOf analytics
     *
     * @description Set a user/session (not hit) custom dimension.
     *
     * @param {Object} dimensions where *key* is custom dimension name and *value* id custom dimension value
     *
     * @example
     * **The custom dimension has to be defined in init method before** 
     * and, after, you have to use same custom dimension name.
     * <pre>
     * // before, I save UserStatus and Valuable custom dimensions with slot "1" and "5"
     * barney.Analytics.init({
     *     dimensions: {
     *         UserStatus: 1
     *     }
     * });
     *   
     * // after, I set UserStatus custom dimension with value "logged"
     * barney.Analytics.setDimension({
     *     UserStatus : 'logged'
     * });
     * </pre>
     */
    this.setDimension = function(newDimension){
        if(newDimension){
            var key, slot, value;
            for(key in newDimension){
                slot = dimensions[key];
                value = newDimension[key];

                if(enabled){
                    ga('set', 'dimension' + slot, value);
                }

                if(verbose){
                    logger.log('BarneyAnalytics', 'set dimension', slot, value);
                }
            }
        }
    };

    /**
     * @ngdoc function
     * @name analytics#trackPage
     * @methodOf analytics
     *
     * @description To track a pageview
     *
     * @param {object} options (see attributes below)
     * @param {string} options.page event page (e.g. '/category/7888')
     * @param {string} options.title event page title (e.g. 'Home Page')
     * @param {Object} options.dimensions list of custom dimensions for this page tracking,  where *key* is custom dimension name and *value* is custom dimension value
     *
     * @example
     * <pre>
     * barney.Analytics.trackPage({
     *     page : '/category/7888',
     *     title: 'Category 7888 Page',
     *     dimensions: {
     *          Valuable: 'yes'
     *     }
     }
     * });
     * </pre>
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
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(enabled){
            ga('send', properties);
        }

        if(verbose){
            logger.log('BarneyAnalytics', 'track pageview', properties);
        }
    };

    /**
     * @ngdoc function
     * @name analytics#trackEvent
     * @methodOf analytics
     *
     * @description Track an event
     *
     * @param {Object} options (see attributes below)
     * @param {string} options.category event category
     * @param {string} options.action event action
     * @param {string} options.label event label
     * @param {integer} options.value event value
     * @param {Object} options.dimensions list of custom dimensions for this event tracking, where *key* is custom dimension name and *value* is custom dimension value
     *
     * @example
     * <pre>
     * barney.Analytics.trackEvent({
     *     category: 'UI',
     *     action: 'open',
     *     label: 'menu',
     *     value: 7,
     *     dimensions: {
     *         Valuable: 'yes'
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
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(enabled){
            ga('send', properties);
        }

        if(verbose){
            logger.log('BarneyAnalytics', 'track event', properties);
        }
    };
};