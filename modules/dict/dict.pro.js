/**
 * @ngdoc object
 * @name dict.BarneyDict
 *
 * @description
 * To use Dict provider, you have to add BarneyDict dependency to your component (directive, controller...).
 * In this example, I have added dependency of BarneyDict to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyDict', '$scope',
 *     function(Dict, $scope){
 *         // we can use "Dict" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyDict as dependency but I have renamed it as Dict 
 * to use it more easily in controller code.
 */
angular.module('barney.dict').provider('BarneyDict', [
    'DictObj',
    function (DictObj) {

        // METODI DEL PROVIDER
        var myProvider = {
            options: {
                showKey: false
            },

             /**
             * @ngdoc function
             * @name dict.BarneyDict#init
             * @methodOf dict.BarneyDict
             *
             * @description 
             * Init dict service
             *
             * @param {Object} options (see attributes below)
             * @param {string} [options.showKey='default']
             *
             * - **default**: the dictionary module prints the value of the dictionary key if it's valued, 
             * else it prints nothing
             * - **all**:  the dictionary module prints the name of the key, for all keys 
             * (valued and not valued keys)
             * - **missing**: the dictionary module prints the value of the dictionary key if it's valued, 
             * else it prints the name of the key
             *
             * @example
             * # Dict Init 
             * if: 
             * <pre>
             * // Dict.existKey = 'Hello';
             * // Dict.notExistKey = undefined; 
             * </pre>
             *
             * Dict with ***default*** showKey
             * <pre>
             *
             * angular.module('mock').controller('HomePageController', [
             *     'BarneyDict', '$window', '$scope',
             *     function(Dict, $window, $scope){
             *   
             *         Dict.init({
             *            showKey : 'default';
             *         });
             *   
             *     }
             * ]);
             *
             * // DICT PRINTS:
             * // Dict.existKey -> Hello
             * // Dict.notExistKey -> 
             * </pre>
             *
             * Dict with ***all*** showKey
             * <pre>
             * angular.module('mock').controller('HomePageController', [
             *     'BarneyDict', '$window', '$scope',
             *     function(Dict, $window, $scope){
             *   
             *         Dict.init({
             *            showKey : 'all';
             *         });
             *   
             *     }
             * ]);
             *
             * // DICT PRINTS:
             * // Dict.existKey -> [[existKey]]
             * // Dict.notExistKey -> [[notExistKey]]
             * </pre>
             *
             * Dict with ***missing*** showKey
             * <pre>
             * angular.module('mock').controller('HomePageController', [
             *     'BarneyDict', '$window', '$scope',
             *     function(Dict, $window, $scope){
             *   
             *         Dict.init({
             *            showKey : 'missing';
             *         });
             *   
             *     }
             * ]);
             *
             * // DICT PRINTS:
             * // Dict.existKey -> Hello
             * // Dict.notExistKey -> [[notExistKey]]
             * </pre>
             */
            init: function(options){
                if(options){
                    this.options = options;
                }
            },

            /**
             * @ngdoc function
             * @name dict.BarneyDict#get
             * @methodOf dict.BarneyDict
             *
             * @description Get value from dictionary key
             *
             * @param {string} key dictionary key
             *
             * @example 
             * # Dict get 
             * Dict as a provider 
             * <pre>
             * angular.module('mock').controller('HomePageController', [
             * 'BarneyDict', '$scope',
             *   function(Dict, $scope){
             *
             *      console.log(Dict.get('VALUED_KEY'));
             *
             *  }
             * ]);
             * </pre>  
             */
            get: function(key){
                // convert key to upper case
                key = key.toUpperCase();

                if(this.options.showKey === 'all'){

                    // 'all case': 
                    // valued keys : show key name
                    // void keys : show key name
                    return '[[' + key + ']]';

                } else if(this.options.showKey === 'missing'){

                    // 'missing' case:
                    // valued keys : show value of key
                    // void keys : show key name
                    if(!!DictObj[key]) {
                        return DictObj[key];
                    } else {
                        return '[[' + key + ']]';
                    }

                } else {

                    // standard case
                    // valued keys : show value of key
                    // void keys : show void string
                    if(!!DictObj[key]) {
                        return DictObj[key];
                    } else {
                        return '';
                    }

                }
            },
            /**
             * @ngdoc function
             * @name dict.BarneyDict#list
             * @methodOf dict.BarneyDict
             *
             * @description Get list of dictionary keys
             *
             * @example 
             * # Dict list
             * This is an example of how to use list method.
             * <pre>
             * angular.module('mock').controller('HomePageController', [
             * 'BarneyDict', '$scope',
             *   function(Dict, $scope){
             *
             *      console.log(Dict.list());
             *
             *  }
             * ]);
             * </pre>  
             */
            list: function(){
                return DictObj;
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
    }
]);