/**
 * @ngdoc object
 * @name callbacky
 *
 * @description
 * You can use callbacky to bind and trigger a function from different points in your code (i.e: controllers, services, ...).
 * 
 * # Import & Usage
 * ## Vanilla JS
 * Import this single file to use Callbacky module, in Vanilla JS:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/base/callbacky.js"> 
 * </pre>
 * Now you can use global object **barney.Callbacky** and associated methods, described below. <br/>
 * You can start by initializing it with {@link callbacky#methods_init init} method.
 *
 * ## Angular
 * Import this single file to use Callbacky module, in Angular framework:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/angular/callbacky.js"> 
 * </pre>
 * Now you can import **barney** module for your Angular app.
 * <pre>
 * angular.module('yourApp', [ 'barney' ]);
 * </pre>
 * Callbacky module for Angular contains only {@link callbacky.BarneyCallbacky BarneyCallbacky service}.
 */
barney.Callbacky = new function(){

    var set = {};   
    var verbose = false;
    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    /**
     * @ngdoc function
     * @name callbacky#init
     * @methodOf callbacky
     *
     * @description Init callbacky module.
     *
     * @param {Object} options (see attributes below)
     * @param {boolean} [options.verbose=false] enable/disable verbose mode.
     * 
     * @param {Object} [options.logger=null] Object that logs (i.e.: window.console, BarneyLogger, ...)
     *
     * @example
     * Here is an example of the init method.
     * <pre>
     * 
     *   barney.Callbacky.init({
     *       verbose:true, // it logs all the work
     *       logger: window.console // set window.console as a logger
     *    });
     * </pre>
     * 
     */
    this.init = function(options){
        if(options){
            if(typeof(options.verbose) !== 'undefined'){
                verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                logger = options.logger;
            }
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'init', this);
        }
    };

    /**
     * @ngdoc function
     * @name callbacky#bind
     * @methodOf callbacky
     *
     * @description 
     * Bind one function to a string.
     *
     * By this way, on the trigger event (with the relative string), the bound function can be called
     * everywhere in your code.
     *
     * @param {string} key Unique key to identify the function
     * @param {method} method Function to call when triggered
     * 
     * @example
     * # Trigger
     * Here is an example of the bind/trigger method 
     * <pre>
     * // FIRST FILE
     * barney.Callbacky.bind('hello', function(args){ 
     *     console.log(args)) 
     * };
     *
     * // SECOND FILE
     * barney.Callbacky.trigger('hello', 'world');
     * // console.log('world');
     * </pre>
     */
    this.bind = function(key, method){
        if(!set[key]){ 
            set[key] = [];
        }
        set[key].push(method);
        if(verbose){
            logger.log('BarneyCallbacky', 'bind', key, method);
        }
    }; 

    /**
     * @ngdoc function
     * @name callbacky#trigger
     * @methodOf callbacky
     *
     * @description 
     * Call the function bound with the given string.
     *
     * On the trigger event, the corresponding function is called.
     *
     * @param {string} key Unique key to identify the function, used in bind() method before
     * @param {*} arg Arguments to pass to saved function 
     * 
     * @example
     * # Trigger
     * Here is an example of the bind/trigger method 
     * <pre>
     * // FIRST FILE
     * barney.Callbacky.bind('hello', function(args){ 
     *     console.log(args)) 
     * };
     *
     * // SECOND FILE
     * barney.Callbacky.trigger('hello', 'world');
     * // console.log('world');
     * </pre>
     */
    this.trigger = function(key, arg){
        if(set[key] && set[key].length > 0){
            for(var i in set[key]){
                set[key][i].call(this, arg);
            }
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'trigger', key, arg);
        }
    };


    /**
     * @ngdoc function
     * @name callbacky#clean
     * @methodOf callbacky
     *
     * @description 
     * Remove the bound function from the given string 
     *
     * @param {string} key Unique key to identify the function
     *
     * @example
     * # Clean
     * Here is an example of the clean method
     * <pre>
     * barney.Callbacky.clean('hello');
     * </pre>
     */ 
    this.clean = function(key){
        if(set[key]){
            set[key] = [];
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'clean', key);
        }
    };
};