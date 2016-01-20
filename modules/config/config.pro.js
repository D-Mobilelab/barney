/**
 * @ngdoc object
 * @name config.BarneyConfig
 *
 * @description
 * Use Config service
 *
 * To use Config service, you have to add BarneyConfig dependency to your component (directive, controller...).
 * In this example, I have added dependency of BarneyConfig to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyConfig', '$scope',
 *     function(Conifg, $scope){
 *         // we can use "Config" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyConifg as dependency but I have renamed it as Config to use it more easily in controller code.
 */
angular.module('barney.config').provider('BarneyConfig', function(){        
    
    var myProvider = {
             /**
             * @ngdoc function
             * @name config.BarneyConfig#init
             * @methodOf config.BarneyConfig
             *
             * @description 
             * This method requires an object that contains all your keys and their values
             * to initialize the Config module.
             * 
             * @param {Object} options ({ 'CONFIG_KEY' : value })
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
         * This method is used to get the value of a specific key in the CONFIG object;
         * 
         * @param {string} key Specific key
         *
         * @example
         * # Conifg get  
         * Here is an example of get method.
         * <pre>
         *  Config.get('ENABLE_LOGIN');
         *  // 1
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
         * This method return the CONFIG object list.
         * 
         *
         * @example
         * # Conifg list  
         * Here is an example of how to use list method.
         * <pre>
         *      console.log( Config.list() );
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