/**
 * @ngdoc object
 * @name callbacky.BarneyCallbacky
 *
 * @description
 * To use Callbacky service, you have to add BarneyCallbacky dependency 
 * to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyCallbacky to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyCallbacky', '$scope',
 *     function(Callbacky, $scope){
 *         // we can use "Callbacky" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyCallbacky as dependency but I have renamed it 
 * as Callbacky to use it more easily in controller code.
 *
 * # List Methods:
 * 
 * - {@link callbacky.BarneyCallbacky#methods_bind bind}
 * - {@link callbacky.BarneyCallbacky#methods_clean clean}
 * - {@link callbacky.BarneyCallbacky#methods_init init}
 * - {@link callbacky.BarneyCallbacky#methods_trigger trigger}
 *
 */
angular.module('barney').provider('BarneyCallbacky', function () {
    
    var myProvider = {

        set: {},

        verbose: false,
        logger: {
            log: function(){},
            info: function(){},
            warn: function(){},
            error: function(){}
        },

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#init
         * @methodOf callbacky.BarneyCallbacky
         *
         * @description 
         * This method is used to initialize the Callbacky module and it
         * requires an object that contains two values
         *
         * @param {Object} options (see attributes below)
         * @param {boolean} [options.verbose=false]
         *
         * - **true**: the Callbacky module logs all the instruction done;
         * - **false**: the Callbacky module logs nothing.
         * 
         * @param {Object} [options.logger=null] Object that logs (i.e.: window.console, BarneyLogger, ...)
         *
         * @example
         * Here is an example of the init method.
         * <pre>
         * 
         *   Callbacky.init({
         *       verbose:true, // it logs all the work
         *       logger: window.console // set window.console as a logger
         *    });
         * </pre>
         * 
         */
        init: function(options){
            if(options){
                if(typeof(options.verbose) !== 'undefined'){
                    this.verbose = options.verbose;
                }
                if(typeof(options.logger) !== 'undefined'){
                    this.logger = options.logger;
                }
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'init', this);
            }
        },

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#bind
         * @methodOf callbacky.BarneyCallbacky
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
         * Callbacky.bind('hello', function(args){ 
         *     console.log(args)) 
         * };
         *
         * // SECOND FILE
         * Callbacky.trigger('hello', 'world');
         * // console.log('world');
         * </pre>
         */
        bind: function(key, method){
            if(!this.set[key]){ 
                this.set[key] = [];
            }
            this.set[key].push(method);
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'bind', key, method);
            }
        }, 

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#trigger
         * @methodOf callbacky.BarneyCallbacky
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
         * Callbacky.bind('hello', function(args){ 
         *     console.log(args)) 
         * };
         *
         * // SECOND FILE
         * Callbacky.trigger('hello', 'world');
         * // console.log('world');
         * </pre>
         */

        trigger: function(key, arg){
            if(this.set[key] && this.set[key].length > 0){
                for(var i in this.set[key]){
                    this.set[key][i].call(this, arg);
                }
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'trigger', key, arg);
            }
        },

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#clean
         * @methodOf callbacky.BarneyCallbacky
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
         * Callbacky.clean('hello');
         * </pre>
         */
        clean: function(key){
            if(this.set[key]){
                this.set[key] = [];
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'clean', key);
            }
        }

    };
    // aggiunge a this il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, myProvider);
    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
        return this;
    }];

});