/**
 * @ngdoc object
 * @name barney.callbacky.BarneyCallbacky
 *
 * @description
 * Use Callbacky service
 *
 * To use Callbacky service, you have to add BarneyCallbacky dependency to your component (i.e: directive, controller...).
 * In this example, I have added dependency of BarneyCallbacky to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyCallbacky', '$scope',
 *     function(Callbacky, $scope){
 *         // we can use "Callbacky" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyCallbacky as dependency but I have renamed it as Callbacky to use it more easily in controller code.
 */
angular.module('barney.callbacky').provider('BarneyCallbacky', function () {
    
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
         * @name barney.callbacky.BarneyCallbacky#init
         * @methodOf barney.callbacky.BarneyCallbacky
         *
         * @description 
         * This method is used to initialize the Callbacky module and it
         * requires an object that contains two values:
         *
         * - verbose: if true, log all the instruction done by the module, else logs nothing (default: false);
         * - logger: Object that logs.
         *
         * @param {Object} options (see attributes below)
         * @param {boolean} [options.verbose=false]
         *
         * - **true**: the Callbacky module logs all the instruction done;
         * - **false**: the Callbacky module logs nothing.
         * 
         * @param {Object} [options.logger=null]
         *
         * Object that logs (i.e: window.console, BarneyLogger, ...)
         *
         * @example
         * # Config Init 
         * Here is an example of the init method.
         * <pre>
         * 
         *   Callbacky.init({
         *       verbose:true, //it logs all the work
         *       logger: window.console //set as a logger the window.console logger
         *    });
         *
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
         * @name barney.callbacky.BarneyCallbacky#bind
         * @methodOf barney.callbacky.BarneyCallbacky
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
         * # Bind 
         * Here is an example of the bind method.
         * <pre>
         * 
         *  Callbacky.bind('hello', function(args){ 
         *       console.log(args)) 
         *       };
         *
         * </pre>
         * 
         * **Remember**: You have to do the bind of a function only once!
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
         * @name barney.callbacky.BarneyCallbacky#trigger
         * @methodOf barney.callbacky.BarneyCallbacky
         *
         * @description 
         * Call the function bound with the given string.
         *
         * On the trigger event, the corresponding function is called.
         *
         * @param {string} key Unique key to identify the function
         * @param {*} arg Arguments of the function;
         *
         * 
         * @example
         * # Trigger
         * Here is an example of the trigger method (the bind is in the example of {@link barney.callbacky.BarneyCallbacky#methods_bind bind} docs).
         * <pre>
         * 
         *  Callbacky.trigger('hello', 'world');
         *
         * </pre>
         * (After the bind) It logs 'world'. 
         *
         * **Remember**: before call trigger somewhere in your code you have to do the relative {@link barney.callbacky.BarneyCallbacky#methods_bind bind} method!
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
         * @name barney.callbacky.BarneyCallbacky#clean
         * @methodOf barney.callbacky.BarneyCallbacky
         *
         * @description 
         * Remove the bound function from the given string 
         *
         * @param {string} key Unique key to identify the function
         *
         * @example
         * # Clean
         * Here is an example of the clean method (the bind is in the example of {@link barney.callbacky.BarneyCallbacky#methods_bind bind} docs).
         * <pre>
         * 
         *  Callbacky.clean('hello');
         *
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