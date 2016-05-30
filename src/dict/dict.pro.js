/**
 * @ngdoc object
 * @name dict.BarneyDict
 *
 * @description
 * To use Dict service, you have to add BarneyDict dependency to your component (directive, controller...):
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyDict', '$scope',
 *     function(BarneyDict, $scope){
 *         // we can use "BarneyDict" object here
 *     }
 * ]);
 * </pre>
 */

angular.module('barney').provider('BarneyDict', [
    function () {

        var parameters = {
            showKey: false
        };

        var myProvider = {

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
             * @param {object} [options.dict={}] Contains the dictionary keys

             * @example
             * Dict with ***default*** showKey
             * <pre>
             *  BarneyDict.init({
             *     showKey : 'default',
             *     dict : {
             *        'existKey': 'Hello!',
             *        'notExistKey': undefined
             *     }
             *  });
             *
             *  // BarneyDict.get('existKey') -> Hello
             *  // BarneyDict.get('notExistKey') -> 
             * </pre>
             *
             * Dict with ***all*** showKey
             * <pre>
             *  BarneyDict.init({
             *     showKey : 'all',
             *     dict : {
             *        'existKey': 'Hello!',
             *        'notExistKey': undefined
             *     }
             *  });
             *
             *  // BarneyDict.get('existKey') -> [[existKey]]
             *  // BarneyDict.get('notExistKey') -> [[notExistKey]]
             * </pre>
             *
             * Dict with ***missing*** showKey
             * <pre>
             *  BarneyDict.init({
             *     showKey : 'missing',
             *     dict : {
             *        'existKey': 'Hello!',
             *        'notExistKey': undefined
             *     }
             *  });
             *
             *  // BarneyDict.get('existKey') -> Hello
             *  // BarneyDict.get('notExistKey') -> [[notExistKey]]
             * </pre>
             */            
            init: function(options){
                if(options){
                    parameters = options;
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
             * <pre>
             *  BarneyDict.init({
             *     showKey : 'default',
             *     dict : {
             *        'existKey': 'Hello!',
             *        'notExistKey': undefined
             *     }
             *  });
             *
             *  BarneyDict.get('existKey');
             *  // it returns 'Hello!'
             * </pre>  
             */
            get: function(key){
                // convert key to upper case
                key = key.toUpperCase();

                if(parameters.showKey === 'all'){

                    // 'all case': 
                    // valued keys : show key name
                    // void keys : show key name
                    return '[[' + key + ']]';

                } else if(parameters.showKey === 'missing'){

                    // 'missing' case:
                    // valued keys : show value of key
                    // void keys : show key name
                    if(!!parameters.dict[key]) {
                        return parameters.dict[key];
                    } else {
                        return '[[' + key + ']]';
                    }

                } else {

                    // standard case
                    // valued keys : show value of key
                    // void keys : show void string
                    if(!!parameters.dict[key]) {
                        return parameters.dict[key];
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
             * <pre>
             *  BarneyDict.init({
             *     showKey : 'default',
             *     dict : {
             *        'existKey': 'Hello!',
             *        'notExistKey': undefined
             *     }
             *  });
             *
             *  BarneyDict.list();
             *  // it returns { 'existKey': 'Hello!', 'notExistKey': undefined }
             * </pre>  
             */
            list: function(){
                return parameters.dict;
            }

        };

        angular.extend(this, myProvider);
        this.$get = [function() {
            return this;
        }];
    }
]);