/**
 * @ngdoc object
 * @name barney.stargate.BarneyStargate
 *
 * @description
 * Use Stargate service
 *
 * To use Stargate service, you have to add BarneyStargate dependency to your component (i.e: directive, controller...).
 *
 * In this example, I have added dependency of BarneyStargate to a controller:
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyStargate', '$scope',
 *     function(Stargate, $scope){
 *         // we can use "Stargate" object here
 *     }
 * ]);
 * </pre>
 * Note that I included BarneyStargate as dependency but I have renamed it as Stargate to use it more easily in controller code.
 *
 * # Stargate Configuration 
 * The configuration of Stargate is not similar for all the products
 * and so the examples are
 * not very useful.
 */
angular.module('barney.stargate').factory('BarneyStargate',
    ['$window', '$q',
    function ($window, $q) {
    
        var service = {
            instance: null,
            waitMe: $q.defer(),

            isActive: function(callback){
                var _this = this;
                
                _this.waitMe.promise.then(function(){
                    callback(_this.instance.isOpen());
                });
            },

            /**
             * @ngdoc function
             * @name barney.stargate.BarneyStargate#init
             * @methodOf barney.stargate.BarneyStargate
             *
             * @description 
             * This method is used to initialize Stargate module.
             *
             * @param {Object} options (see params below)
             * @param {object} [options.configurations=null] //chiedi a pasquale 
             * @param {string} [options.publicKey=''] Public Key ***Deprecated for security reasons***
             * @param {object} [options.onHandshake=function(){}] Callback to call after handshake
             *
             */
            init: function(options){
                var _this = this;
                
                options = options || {};
                options.configurations = options.configurations || {};
                options.publicKey = options.publicKey || '';
                options.onHandshake = options.onHandshake || function(){};
                
                _this.instance = Stargate.initialize(options.configurations, options.publicKey, function(){
                    _this.waitMe.resolve();         
                    options.onHandshake();
                }, function(){
                    _this.waitMe.resolve();         
                    options.onHandshake();
                });
            },

            /**
             * @ngdoc function
             * @name barney.stargate.BarneyStargate#openUrl
             * @methodOf barney.stargate.BarneyStargate
             *
             * @description 
             * This method is used to open a new url.
             *
             * @param {Object} options (see params below)
             * @param {string} [options.url=''] New url to open
             * @param {Object} [options.fallback=function(){}] Fallback
             *
             * @example
             * # Stargate openUrl
             * <pre>
             *  openUrl({ url: 'http://www.google.it' });
             *  // or
             *  openUrl({ 
             *      fallback: function(){ 
             *          window.open('http://www.google.com'); 
             *      } 
             *  });
             * </pre>
             * 
             */
            
            openUrl: function(options){
                var _this = this;
                
                options.fallback = options.fallback || function(){
                    $window.location.href = options.url;
                };

                _this.isActive(function(active){
                    if(active){
                        _this.instance.openUrl(options.url);
                    } else {
                        options.fallback();
                    }
                });         
            }
        };
        
        return service;
    }
]);