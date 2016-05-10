var BarneyNewton = new function(){

    this.enabled = true;
    this.verbose = false;
    var heartbeats = {};

    this.logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    this.init = function(options){
        if(options){
            if(typeof(options.enabled) !== 'undefined'){
                this.enabled = options.enabled;
            }
            if(typeof(options.verbose) !== 'undefined'){
                this.verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                this.logger = options.logger;
            }
        }

        if(this.verbose){
            this.logger.log('BarneyNewton', 'init', this);
        }
    };

    this.trackPage = function(options){
        if(this.verbose){
            this.logger.log('BarneyNewton', 'track', 'pageview', options);
        }

        if(this.enabled){
            Newton.getSharedInstance().sendEvent('pageview', Newton.SimpleObject.fromJSONObject(options));
        }
    };


    // traccia un evento, prende come parametri:
    // - event: nome dell'evento
    // - options: opzioni dell'evento (per esempio category e label) 
    this.trackEvent = function(event, options){
        if(this.verbose){
            this.logger.log('BarneyNewton', 'track', event, options);
        }

        if(this.enabled){
            Newton.getSharedInstance().sendEvent(event, Newton.SimpleObject.fromJSONObject(options));
        }
    };

    this.startHeartbeat = function(keyword, params){
        if(this.enabled){
            if(!heartbeats[keyword]){
                heartbeatProperties = Newton.SimpleObject.fromJSONObject(params);
                heartbeats[keyword] = {keyWord: keyword, properties: heartbeatProperties};

                if(heartbeats[keyword]){
                    Newton.getSharedInstance().timedEventStart(heartbeats[keyword].keyWord, heartbeats[keyword].properties);

                    if(this.verbose){
                        this.logger.log(heartbeats[keyword].keyWord, 'HEARTBEAT STARTED _______/\\_/\\_', heartbeats[keyword].properties);
                    }
                }
            } else {
                if(this.verbose){
                    this.logger.warn('An heartbeat with \'' + heartbeats[keyword].keyWord + '\' is already running!');
                }
            }
        }        
    };

    this.stopHeartbeat = function(keyword){
        if(this.enabled){
            if(heartbeats[keyword]){
                Newton.getSharedInstance().timedEventStop(heartbeats[keyword].keyWord, heartbeats[keyword].properties);

                if(this.verbose){
                    this.logger.log(heartbeats[keyword].keyWord, 'HEARTBEAT STOPPED _/\\_/\\_______', heartbeats[keyword].properties);
                }

                var deleted = delete heartbeats[keyword];
                if(deleted && this.verbose){
                    this.logger.log('An heartbeat has Been removed from heartbeats!', heartbeats);
                }
            }
        }
    };

    this.stopAllHeartbeat = function(){
        if(this.enabled){
            for(var key in heartbeats){
                this.stopHeartbeat(heartbeats[key].keyWord);
            }
            if(this.verbose){
                this.logger.log('All heartbeats has been stopped!');
            }
        }
    };

    this.heartbeatsList = function(){
        if(this.enabled){
            if(this.verbose){
                this.logger.log('HEARTBEAT __/\\_/\\__: ', heartbeats);
            }   

            return heartbeats;
        } else {
            return undefined;
        }
    };

    this.getSingleHeartbeat = function(keyword){
        if(this.enabled){
            if(this.verbose){
                this.logger.log('Single Heartbeat __/\\_/\\__: ', heartbeats[keyword]);
            }

            return heartbeats[keyword];
        } else {
            return undefined;
        }
    };

};

  