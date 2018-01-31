/**
 * @ngdoc object
 * @name config.BarneyConfig
 *
 * @description
 * To use Config service, you have to add BarneyConfig dependency to your component (directive, controller...):
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyConfig', '$scope',
 *     function(BarneyConfig, $scope){
 *         // we can use "BarneyConfig" object here
 *     }
 * ]);
 * </pre>
 * 
 * Remember that, before calling any other method, **the init method must be called first of all**.
 * 
 */

angular.module('barney').provider('BarneyConfig', function(){   

    var config = {}, upperCase = false;  

    var getNestedKey = function(object, key) {
        key = key.replace(/\[(\w+)\]/g, '.$1');
        key = key.replace(/^\./, '');
        var a = key.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in object) {
                object = object[k];
            } else {
                return undefined;
            }
        }
        return object;
    };
    
    var myProvider = {
        
        /**
         * @ngdoc function
         * @name config.BarneyConfig#init
         * @methodOf config.BarneyConfig
         *
         * @description 
         * This method requires an object that contains all keys and their values.
         * 
         * @param {Object} config config object
         * @param {Object} upperCase convert all keys to uppercase
         *
         * @example
         * <pre>
         *  BarneyConfig.init(
         *      config: {
         *          'KEY_ZERO': 0,
         *          'ENABLE_LOGIN': 1,
         *          'NEWTON_SECRET_KEY': '<sec_ret>',
         *          'KEY_TRUE': true,
         *          'KEY_FALSE': false
         *      },
         *      upperCase: true
         *  });
         * </pre>
         */
        init: function(options){
            if(options && options.config){
                config = options.config;
                upperCase = options.upperCase || false;
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
         * @param {string} key specific key
         *
         * @example
         * <pre>
         * // BarneyConfig.init({ 'ENABLE_LOGIN': 1 })
         *
         * BarneyConfig.get('ENABLE_LOGIN');
         * // it returns 1
         * </pre>
         */
        get: function(value){
            var falseValues = ['', 0, '0', null, 'null', false, 'false'];
            value = upperCase ? value.toUpperCase() : value;
            var confValue = value.indexOf('.') !== -1 ? getNestedKey(config, value) : config[value];
            if(falseValues.indexOf(confValue) !== -1){
                return false;
            } else {
                return confValue;
            }
        },

        /**
         * @ngdoc function
         * @name config.BarneyConfig#list
         * @methodOf config.BarneyConfig
         *
         * @description 
         * This method returns the Configuration list.
         *
         * @example
         * <pre>
         * // BarneyConfig.init({ 'ENABLE_LOGIN': 1 })
         *
         * BarneyConfig.list();
         * // it returns { 'ENABLE_LOGIN': 1 }
         * </pre>
         */
        list: function(){
            return config;
        }
        
    };

    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});