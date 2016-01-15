/**
 * @ngdoc object
 * @name barney.config.BarneyConfig
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
             * @name barney.config.BarneyConfig#init
             * @methodOf barney.config.BarneyConfig
             *
             * @description 
             * In order to allow a pretty response from the config module if a variable doesn't exist, you can set this by passing an object to the init method including the notExistValue param. 
             *  
             * The allowed values are null, false, 0 or a string.
             * 
             * @param {Object} options ({CONFIG_KEY:value})
             *
             * @example
             * # Config Init 
             * Here is an example of init method.
             * <pre>
             *  Config.init({
             *     notExistValue:null // Allowed notExistValue values: null, false, 0 or string
             *  });
             * </pre>
             */
        init: function(options){
            if(options && options.config){
                this.config = options.config;
            }
        },

        /**
         * @ngdoc function
         * @name barney.config.BarneyConfig#get
         * @methodOf barney.config.BarneyConfig
         *
         * @description 
         * This method is used to get the value of a specific key in the CONFIG object;
         * 
         * @param {string} value (key)
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
         * @name barney.config.BarneyConfig#list
         * @methodOf barney.config.BarneyConfig
         *
         * @description 
         * This method return the CONFIG object list.
         * 
         *
         * @example
         * # Conifg list  
         * Here is an example of list method.
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