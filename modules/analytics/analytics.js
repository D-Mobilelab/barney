var BarneyAnalytics = new function(){

    var dimensions = {};
    var enabled = true;
    var verbose = false;
    var logger = {
        log: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
    };

    this.init = function(options) {
        if(options) {
            if(options.dimensions){
                dimensions = options.dimensions;
            }
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
            logger.log('BarneyAnalytics', 'init', this);
        }
    };

    this.setId = function(id){
        if(id){
            if(verbose){
                logger.log('BarneyAnalytics', 'set id', id);
            }

            if(enabled){
                ga('set', '&uid', id);
            }
        }
    };

    this.setDimension = function(newDimension){
        if(newDimension){
            var key, slot, value;
            for(key in newDimension){
                slot = dimensions[key];
                value = newDimension[key];

                if(verbose){
                    logger.log('BarneyAnalytics', 'set dimension', slot, value);
                }

                if(enabled){
                    ga('set', 'dimension' + slot, value);
                }
            }
        }
    };

    this.trackPage = function(options){
        var properties = { 
            'hitType': 'pageview'
        };

        if(options.page){
            properties.page = options.page;
        }
        if(options.title){
            properties.title = options.title;
        }
        if(options.dimensions){
            var key, slot, value;
            for(key in options.dimensions){
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(verbose){
            logger.log('BarneyAnalytics', 'track pageview', properties);
        }

        if(enabled){
            ga('send', properties);
        }
    };

    this.trackEvent = function(options){
        var properties = { 
            'hitType': 'event'
        };

        if(options.category){
            properties.eventCategory = options.category;
        }
        if(options.action){
            properties.eventAction = options.action;
        }
        if(options.label){
            properties.eventLabel = options.label;
        }
        if(options.value){
            properties.eventValue = options.value;
        }
        if(options.dimensions){
            var key, slot, value;
            for(key in options.dimensions){
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(verbose){
            logger.log('BarneyAnalytics', 'track event', properties);
        }

        if(enabled){
            ga('send', properties);
        }
    };
};