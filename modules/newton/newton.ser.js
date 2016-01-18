angular.module('barney.newton').factory('BarneyNewton', function(){

    this.enabled = true;
    this.verbose = false;
    this.logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    // inizializza il modulo newton, parametri:
    // - enabled: abilita o disabilita il modulo (default: true)
    // - verbose: logga tutte le operazioni eseguite sul modulo (default: false)
    // - logger: oggetto che si occuperà di loggare (per esempio window.console o BarneyLogger, default: null)
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

    // traccia una page view, prende come parametri
    // - options: opzioni dell'evento (per esempio title e page)
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

    return this;

});