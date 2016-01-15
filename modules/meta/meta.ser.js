/**
 * @ngdoc object
 * @name barney.meta.BarneyMeta
 *
 * @description
 * Meta is the module of Barney to fill meta tags dinamically.
 * Meta can be used to manage different metatags for each page.
 *
 * To use Meta service, you have to add BarneyMeta dependency to your component (directive, controller...). In this example, I have added dependency of BarneyMeta to a controller:
 *
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *   'BarneyMeta', '$scope',
 *   function(Meta, $scope){
 *       // we can use "Meta" object here
 *   }
 * ]);
 * </pre>
 * 
 * Note that I included BarneyMeta as dependency but I have renamed it as Meta to use it more easily in controller code.
 */

angular.module('barney.meta').factory('BarneyMeta', [
    '$rootScope',
    function ($rootScope) {

        $rootScope.meta = {};
        $rootScope.defaultMeta = {};

        /**
         * @ngdoc function
         * @name barney.meta.BarneyMeta#init
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * **It's recommended to inizialize it in the app module run**.
         *
         * To inizialize it, you have to:
         * 
         *  - include BarneyMeta component in your run method
         *  - use init method and pass it an object with **free** keys
         * 
         * The object will contain standard keys that you will use in your product.
         *
         * @param {Object} metatags (free keys and values)
         *
         * @example
         * <pre>
         * angular.module('mock').run(['BarneyMeta',
         * function(Meta){
         * 
         *    Meta.init({
         *        title: 'Standard title',
         *        description: 'Standard description',
         *        image: 'standard-image.jpg'
         *   });
         *
         *   }
         * ]);
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
         * @name barney.meta.BarneyMeta#get
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * To print a single current key, you can use Meta.get() method, passing key name.
         *
         * @param  {string} key key' s name
         *
         * @example
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         * 'BarneyMeta', '$scope',
         *  function(Meta, $scope){
         * 
         *      console.log( Meta.get('title') );
         *   
         *  }
         * ]);
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
         * @name barney.meta.BarneyMeta#set
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * To set one or more current keys, you can use Meta.set() method, passing an object with keys and their values.
         *
         * @param  {object} metatags new keys values
         *
         * @example
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         * 'BarneyMeta', '$scope',
         *  function(Meta, $scope){
         * 
         *      Meta.set({key1 : 'value1',
         *                key2 : 'value2'
         *      });
         *   
         *  }
         * ]);
         * </pre>
         */
        this.set = function(metatags){
            for(var key in metatags){
                $rootScope.meta[key] = metatags[key];
            }
        };

        /**
         * @ngdoc function
         * @name barney.meta.BarneyMeta#lsit
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * To print a list of all current keys, you can use Meta.list() method.
         *
         * @example
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         * 'BarneyMeta', '$scope',
         *  function(Meta, $scope){
         * 
         *        console.log( Meta.list() );
         * 
         *  }
         * ]);
         * </pre>
         */
        this.list = function(){
            return $rootScope.meta;
        };

        /**
         * @ngdoc function
         * @name barney.meta.BarneyMeta#default
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * To print a list of all standard keys, passed to init method, you can use Meta.defaults() method.
         *
         * @example
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         * 'BarneyMeta', '$scope',
         *  function(Meta, $scope){
         * 
         *        console.log( Meta.defaults() );
         * 
         *  }
         * ]);
         * </pre>
         */
        this.defaults = function(){
            return $rootScope.defaultMeta;
        };

         /**
         * @ngdoc function
         * @name barney.meta.BarneyMeta#revert
         * @methodOf barney.meta.BarneyMeta
         *
         * @description 
         * Restore the previous default values (setted with init)
         *
         * @example
         * <pre>
         * angular.module('mock').controller('HomePageController', [
         * 'BarneyMeta', '$scope',
         *  function(Meta, $scope){
         * 
         *        Meta.revert();
         * 
         *  }
         * ]);
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
