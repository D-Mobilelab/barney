barney.Newton = new function(){

    var enabled = true;
    var verbose = false;
    var heartbeats = {};
    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    this.init = function(options){
        if(options){
            if(typeof(options.enabled) !== 'undefined'){
                enabled = options.enabled;
            }
            if(typeof(options.verbose) !== 'undefined'){
                verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                logger = options.logger;
            }
        }

        if(verbose){
            logger.log('BarneyNewton', 'init', this);
        }
    };

    this.trackPage = function(options){
        if(enabled){
            Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
        }

        if(verbose){
            logger.log('BarneyNewton', 'track', 'pageview', options);
        }
    };


    this.trackEvent = function(event, options){
        if(enabled){
            Newton.getSharedInstance().sendEvent(event, Newton.SimpleObject.fromJSONObject(options));
        }

        if(verbose){
            logger.log('BarneyNewton', 'track', event, options);
        }
    };

    this.startHeartbeat = function(keyword, options){
        if(!heartbeats[keyword]){
            if(enabled){
                Newton.getSharedInstance().timedEventStart(keyword, Newton.SimpleObject.fromJSONObject(options));
            }

            if(verbose){
                logger.log('BarneyNewton', 'heartbeat', 'start', keyword, options);
            }

            heartbeats[keyword] = {enabled: true, options: options};
        } else {
            if(verbose && heartbeats[keyword].enabled == true){
                logger.warn('BarneyNewton', 'heartbeat', 'start', keyword + ' is already running');
            }
        }    
    };

    this.stopHeartbeat = function(keyword, options){
        if(heartbeats[keyword]){
            if(enabled){
                Newton.getSharedInstance().timedEventStop(keyword, Newton.SimpleObject.fromJSONObject(options));
            }

            if(verbose){
                logger.log('BarneyNewton', 'heartbeat', 'stop', keyword, options);
            }

            heartbeats[keyword].enabled = false;
        } else {
            logger.warn('BarneyNewton', 'heartbeat', 'stop', keyword + ' is not running');
        }
    };

    this.stopAllHeartbeat = function(){
        if(enabled){
            for(var key in heartbeats){
                this.stopHeartbeat(key, heartbeats[key].options);
            }
        }

        if(verbose){
            logger.log('BarneyNewton', 'heartbeat', 'stop all');
        }
    };

    this.heartbeatsList = function(){
        return heartbeats;
    };

    this.getSingleHeartbeat = function(keyword){
        return heartbeats[keyword];
    };

};

  