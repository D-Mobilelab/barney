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

            // init({ configurations: ..., publicKey: ..., onHandshake: ... })
            init: function(options){
                var _this = this;
                
                options = options || {};
                options.configurations = options.configurations || {};
                options.publicKey = options.configurations || '';
                options.onHandshake = options.onHandshake || function(){};
                
                _this.instance = Stargate.initialize(options.configurations, options.publicKey, function(){
                    _this.waitMe.resolve();         
                    options.onHandshake();
                }, function(){
                    _this.waitMe.resolve();         
                    options.onHandshake();
                });
            },

            // openUrl({ url: 'http://www.google.it' });
            // openUrl({ fallback: function(){ window.open('http://www.google.com'); } });
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