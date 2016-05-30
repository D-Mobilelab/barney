/**
 * @ngdoc object
 * @name meta.BarneyMeta
 *
 * @description
 * To use Meta service, you have to add BarneyMeta dependency to your component (i.e: directive, controller...):
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyMeta', '$scope',
 *     function(BarneyMeta, $scope){
 *         // we can use "BarneyMeta" object here
 *     }
 * ]);
 */

angular.module('barney').factory('BarneyMeta', [
    '$rootScope',
    function ($rootScope) {

        $rootScope.meta = {};
        $rootScope.defaultMeta = {};

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#init
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * **It's recommended call this method in your module run() phase**.
         *
         * You have to pass to init() an object will contain default keys 
         * that you will use in your pages, if other keys are not defined.
         *
         * @param {Object} metatags default keys
         *
         * @example
         * <pre>
         *  Meta.init({
         *      title: 'Standard title',
         *      description: 'Standard description',
         *      image: 'standard-image.jpg'
         *  });
         * </pre>
         */
        this.init = function(metatags){
            for(var key in metatags){
                $rootScope.defaultMeta[key] = metatags[key];
                $rootScope.meta[key] = metatags[key];
            }
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#get
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To print a single current key, you can use Meta.get() method, passing key name.
         *
         * *To use this method, the init method must be called before.*
         *
         * @param {string} key name of key
         *
         * @example
         * <pre>
         *  Meta.get('title');
         * </pre>
         */
        this.get = function(key){
            if(!!$rootScope.meta[key]){
                return $rootScope.meta[key];
            } else {
                return '';
            }
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#set
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To set one or more keys for a page, pass an object with keys and their values.
         *
         * *To use this method, the init method must be called before.*
         *
         * @param {object} metatags new keys values
         *
         * @example
         * <pre>
         *  Meta.set({ title: 'Zoom Title', description: 'This is new description' });
         * </pre>
         */
        this.set = function(metatags){
            for(var key in metatags){
                $rootScope.meta[key] = metatags[key];
            }
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#list
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To print a list of all current keys.
         *
         * *To use this method, the init method must be called before.*
         *
         * @example
         * <pre>
         *  Meta.list();
         * </pre>
         */
        this.list = function(){
            return $rootScope.meta;
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#defaults
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To print a list of all default keys.
         *
         * *To use this method, the init method must be called before.*
         *
         * @example
         * <pre>
         *  Meta.defaults();
         * </pre>
         */
        this.defaults = function(){
            return $rootScope.defaultMeta;
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#defaults
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To revert all keys to default values.
         *
         * *To use this method, the init method must be called before.*
         *
         * **It's recommended to use it in routeChangeStart event**
         *
         * @example
         * <pre>
         *  $rootScope.$on('$routeChangeStart', function(event, current, previous){
         *      Meta.revert();
         *  });
         * </pre>
         */
        this.revert = function(){
            for(var key in $rootScope.defaultMeta){
                $rootScope.meta[key] = $rootScope.defaultMeta[key];
            }
        };

        return this;
    }
]);
