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
 * </pre>
 * 
 * Remember that, before calling any other method, **the init method must be called first of all**.
 *
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
         * You have to call init() method with standard values of meta tags.
         *
         * On route change, the meta tags will be reverted to standard values.
         * 
         * If you want different values of meta tags for a page, call set() method with different keys.
         *
         * **It's recommended call this method in your module run() phase**.
         *
         * @param {Object} metatags default keys
         *
         * @example
         * <pre>
         *  // HTML
         *  <title ng-bind='{{meta.title}}'></title>
         *  <meta name="description" value="{{meta.description}}" />
         *  <meta name="og:image" value="{{meta.image}}" />
         *
         *  // Javascript
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

            // revert to default keys
            var _this = this;
            $rootScope.$on('$routeChangeStart', function(){
                _this.revert();
            });
        };

        /**
         * @ngdoc function
         * @name meta.BarneyMeta#get
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * To print a single current key, you can use Meta.get() method, passing key name.
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
         * @name meta.BarneyMeta#revert
         * @methodOf meta.BarneyMeta
         *
         * @description 
         * On routeChangeStart event, all keys are reverted, automatically.
         * 
         * If you want to revert them manually, you can call revert() method.
         *
         * @example
         * <pre>
         *   Meta.revert();
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
