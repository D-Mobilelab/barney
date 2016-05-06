var BarneyCallbacky = new function(){

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
    }
}