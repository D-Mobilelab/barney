(function(name, parent){
    var BaseLogger = function(){
        var _baseLogger = this;

        // defines log levels and their order (priority)
        var levels = ['log', 'table', 'info', 'warn', 'error'];
        
        // config will hold the configuration used at runtime, e.g. 
        var config = {};

        // "read-only" getter for config
        this.getConfig = function getConfig(){
            return JSON.parse(JSON.stringify(config));
        };

        // default emit function: uses console for logging messages
        var emit = function emit(level, args){
            console[level](args);
        };

        // init the module with optional parameters
        this.init = function init(options){
            // used for checking the type of each attribute in options
            var typeOfenabled = typeof options.enabled;
            var typeOfLevel = typeof options.level;
            var typeOfLevels = typeof options.levels;
            var typeOfEmit = typeof options.emit;

            // enabled setup
            if (typeOfenabled === 'boolean'){
                config.enabled = options.enabled;
            } else if (typeOfenabled !== 'undefined') {
                throw new Error('BaseLogger :: illegal type for enabled - expected boolean, got ' + typeOfenabled);
            }

            /* one-level setup
            * only shows messages with level higher or equal to the required one, e.g.
            * options = {
            *     level: 'info'
            * }
            */
            if (typeOfLevel === 'string'){
                if (levels.indexOf(options.level) === -1){
                    throw new Error('Logger :: unknown level ' + options.level);
                } else {
                    for (var i = 0; i < levels.length; i++){
                        config[levels[i]] = levels.indexOf(options.level) <= i;
                    }
                }
            } else if (typeOfLevel !== 'undefined') {
                throw new Error('BaseLogger :: illegal type for level - expected string, got ' + typeOfLevel);
            }

            /* level-by-level setup
            * sets each level on a case-by-case basis, e.g.
            * options = {
            *     levels: { 
            *         'log': false, 
            *         'info': false, 
            *         'warn': true,
            *         'error': true,
            *         'table': false 
            *     }
            * }
            */
            if (typeOfLevels === 'object'){
                var level;
                // sanity checks first
                for (level in options.levels){
                    // sanity check for each level's value type (must be a boolean)
                    typeOfLevel = typeof options.levels[level]; 
                    if (typeOfLevel !== 'boolean'){
                        throw new Error('BaseLogger :: illegal value type for level "' + level + '"' +
                                ' - expected boolean, got "' + typeOfLevel + '"');
                    }

                    // ignore unknown levels
                    if (levels.indexOf(level) === -1){
                        throw new Error('BaseLogger :: unknown log level "' + level + '"');
                    }
                }

                // now that we are sure all values are legal, we can put them into the new configuration
                for (level in options.levels){
                    config[level] = !!options.levels[level];
                }
            } else if (typeOfLevels !== 'undefined'){
                throw new Error('BaseLogger :: illegal type for levels - expected object, got ' + typeOfLevels);
            }

            /* custom emit function
            * allows you to use a custom function as an emitter
            */
            if (typeOfEmit === 'function'){
                emit = options.emit;
            } else if (typeOfEmit !== 'undefined'){
                throw new Error('BaseLogger :: illegal type for emit - expected function, got ' + typeOfEmit);
            }
        };

        
        /* define a method for each log level
        *  each method uses the general function emit to log messages
        */
        this.log = function log(){
            if (config.enabled && !!config.log){
                emit('log', arguments);
            }
        };

        this.table = function table(){
            if (config.enabled && !!config.table){
                emit('table', arguments);
            }    
        };

        this.info = function info(){
            if (config.enabled && !!config.info){
                emit('info', arguments);
            }
        };
        
        this.warn = function warn(){
            if (config.enabled && !!config.warn){
                emit('warn', arguments);
            }    
        };
        
        this.error = function error(){
            if (config.enabled && !!config.error){
                emit('error', arguments);
            }    
        };

        this.isEnabled = function(){
            return !!config.enabled;
        };

        // default setup: show every message
        _baseLogger.init({
            level: 'log',
            enabled: true
        });

    };
    parent[name] = BaseLogger;

})('BaseLogger', window);