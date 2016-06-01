/**
 * @ngdoc object
 * @name callbacky.BarneyCallbacky
 *
 * @description 
 * Angular service of {@link callbacky Callbacky} module
 *
 * # Import & Usage
 * To use Callbacky service, you have to add BarneyCallbacky 
 * dependency to your component (directive, controller...).
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyCallbacky',
 *     function(BarneyCallbacky){
 *         // we can use "BarneyCallbacky" object here
 *     }
 * ]);
 * </pre>
 */
angular.module('barney').provider('BarneyCallbacky', function () {

    var myProvider = {

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#init
         * @methodOf callbacky.BarneyCallbacky
         *
         * @description Refer to {@link callbacky#methods_init init} method of Analytics module, replacing *barney.callbacky* to *BarneyCallbacky*
         */
        init: function(options){
            barney.Callbacky.init(options);
        },

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#bind
         * @methodOf callbacky.BarneyCallbacky
         *
         * @description Refer to {@link callbacky#methods_bind bind} method of Analytics module, replacing *barney.callbacky* to *BarneyCallbacky*
         */
        bind: function(key, method){
            barney.Callbacky.bind(key, method);
        }, 

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#trigger
         * @methodOf callbacky.BarneyCallbacky
         *
         * @description Refer to {@link callbacky#methods_trigger trigger} method of Analytics module, replacing *barney.callbacky* to *BarneyCallbacky*
         */
        trigger: function(key, arg){
            barney.Callbacky.trigger(key, arg);
        },

        /**
         * @ngdoc function
         * @name callbacky.BarneyCallbacky#clean
         * @methodOf callbacky.BarneyCallbacky
         *
         * @description Refer to {@link callbacky#methods_clean clean} method of Analytics module, replacing *barney.callbacky* to *BarneyCallbacky*
         */
        clean: function(key){
            barney.Callbacky.clean(key);
        }

    };
    
    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});