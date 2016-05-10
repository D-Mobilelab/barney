if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.Callbacky = new function(){

    var set = {};   
    var verbose = false;
    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    this.init = function(options){
        if(options){
            if(typeof(options.verbose) !== 'undefined'){
                verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                logger = options.logger;
            }
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'init', this);
        }
    };

    this.bind = function(key, method){
        if(!set[key]){ 
            set[key] = [];
        }
        set[key].push(method);
        if(verbose){
            logger.log('BarneyCallbacky', 'bind', key, method);
        }
    }; 

    this.trigger = function(key, arg){
        if(set[key] && set[key].length > 0){
            for(var i in set[key]){
                set[key][i].call(this, arg);
            }
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'trigger', key, arg);
        }
    };

    this.clean = function(key){
        if(set[key]){
            set[key] = [];
        }
        if(verbose){
            logger.log('BarneyCallbacky', 'clean', key);
        }
    };
};
angular.module('barney').provider('BarneyCallbacky', function () {

    var myProvider = {

        init: function(options){
            barney.Callbacky.init(options);
        },

        bind: function(key, method){
            barney.Callbacky.bind(key, method);
        }, 

        trigger: function(key, arg){
            barney.Callbacky.trigger(key, arg);
        },

        clean: function(key){
            barney.Callbacky.clean(key);
        }

    };
    
    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];

});