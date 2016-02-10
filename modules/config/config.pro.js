/**
 * @ngdoc object
 * @name config.BarneyConfig
 *
 * @description
 * To use Config service, you have to add BarneyConfig dependency to your component (directive, controller...).
 * In this example, I have added dependency of BarneyConfig to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyConfig', '$scope',
 *     function(Config, $scope){
 *         // we can use "Config" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyConifg as dependency but I have renamed it as Config to use it more easily in controller code.
 *
 * # List Methods:
 * 
 * - {@link config.BarneyConfig#methods_get get}
 * - {@link config.BarneyConfig#methods_init init}
 * - {@link config.BarneyConfig#methods_list list}
 *
 */
angular.module('barney').provider('BarneyConfig', function(){        
    
    var myProvider = {
             /**
             * @ngdoc function
             * @name config.BarneyConfig#init
             * @methodOf config.BarneyConfig
             *
             * @description 
             * This method requires an object that contains all your keys and their values
             * to initialize the Config service.
             * 
             * @param {Object} options config object
             *
             * @example
             * # Config Init 
             * Here is an example of init method.
             * <pre>
             *  Config.init({
             *      'ENABLE_LOGIN': 1,
             *      'NEWTON_SECRET_KEY': '<sec_ret>',
             *      'KEY_TRUE': true,
             *      'KEY_VOID_STRING': '',
             *      'KEY_ZERO': 0,
             *      'KEY_ZERO_STRING': '0',
             *      'KEY_NULL': null,
             *      'KEY_NULL_STRING': 'null',
             *      'KEY_FALSE': false,
             *      'KEY_FALSE_STRING': 'false'
             *      });
             * </pre>
             */
        init: function(options){
            if(options && options.config){
                this.config = options.config;
            }
        },

        /**
         * @ngdoc function
         * @name config.BarneyConfig#get
         * @methodOf config.BarneyConfig
         *
         * @description 
         * This method is used to get the value of a specific configuration key
         * 
         * @param {string} key Specific key
         *
         * @example
         * # Config get  
         * Here is an example of get method.
         * <pre>
         * // Config.init({ 'ENABLE_LOGIN': 1 })
         *
         * Config.get('ENABLE_LOGIN');
         *
         * // 1
         * </pre>
         */
        get: function(value){
            var falseValues = ['', 0, '0', null, 'null', false, 'false'];
            value = value.toUpperCase();
            if(falseValues.indexOf(this.config[value]) !== -1){
                return false;
            } else {
                return this.config[value];
            }
        },

        /**
         * @ngdoc function
         * @name config.BarneyConfig#list
         * @methodOf config.BarneyConfig
         *
         * @description 
         * This method return the Configuration list.
         * 
         * @example
         * # Conifg list  
         * Here is an example of how to use list method.
         * <pre>
         * // Config.init({ 'ENABLE_LOGIN': 1 })
         *
         * Config.get('ENABLE_LOGIN');
         *
         * // { 'ENABLE_LOGIN': 1 }
         * </pre>
         */
        list: function(){
            return this.config;
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