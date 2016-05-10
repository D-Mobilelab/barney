if(!barney) { var barney = {}; }
if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }
barney.BaseLogger = new function(){

    // defines log levels and their order (priority)
    // config will hold the configuration used at runtime, e.g. 
    var levels = ['log', 'table', 'info', 'warn', 'error'];
    var config = {};

    // "read-only" getter for config
    this.getConfig = function(){
        return JSON.parse(JSON.stringify(config));
    };

    // default emit function: uses console for logging messages
    var emit = function(level, args){
        console[level](args);
    };

    // init the module with optional parameters
    this.init = function(options){
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
    this.log = function(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.log){
            emit('log', args);
        }
    };

    this.table = function(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.table){
            emit('table', args);
        }    
    };

    this.info = function(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.info){
            emit('info', args);
        }
    };

    this.warn = function(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.warn){
            emit('warn', args);
        }    
    };

    this.error = function(){
        var args = Array.prototype.slice.call(arguments);
        if (config.enabled && !!config.error){
            emit('error', args);
        }    
    };

    this.isEnabled = function(){
        return !!config.enabled;
    };

};
angular.module('barney').factory('BarneyLogger', function(){

    barney.BaseLogger.init({
        enabled: true,
        level: 'log'
    });

    return barney.BaseLogger;
});
barney.RotatingLog = new function(){

    // IMPORTANT: requires Logger
    var logger = barney.BaseLogger;

    // this Array will contain each message
    var messages = [];
    // this is the max size of messages (before it gets downloaded)
    var maxSize = 100;

    // true if logger is enabled (by config) to record messages
    var recordingEnabled = true;
    // true if logger is recording messages
    var isRecording = false;
    // if true, only the last maxSize messages are recorded
    var sliding = true;

    /* wraps original Logger's getConfig function
    * adding maxSize attribute
    */
    this.getConfig = function(){
        var config = logger.getConfig();
        config.maxSize = maxSize;
        config.sliding = sliding;
        return config;
    };

    var handleMessages = function(level, args){
        if (messages.length >= maxSize){
            if (!sliding){
                endRotate();
            } else {
                messages.shift();
            }
        }

        logger[level](args);
        if (recordingEnabled && logger.getConfig().enabled && isRecording){
            messages.push([level, args]);
        }
    };

    // expose Logger's main methods
    this.log = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('log', args);
    };
    this.info = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('info', args);
    };
    this.table = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('table', args);
    };
    this.warn = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('warn', args);
    };
    this.error = function(){
        var args = Array.prototype.slice.call(arguments);
        handleMessages('error', args);
    };

    // this will open a new tab showing a chunk of messages in JSON format
    var saveRecords = function(msgs){
        var exportData = 'data:text/json;charset=utf-8,';
        exportData += JSON.stringify(msgs, null, 4);
        var encodedUri = encodeURI(exportData);
        window.open(encodedUri, '_blank');
    };

    var endRotate = function(){
        saveRecords(messages);
        messages = [];
    };

    // starts adding logs to messages var
    this.startRecording = function(resetMessages){
        if (!!resetMessages){
            messages = [];
        }
        isRecording = true;
    };

    // stops recording messages and downloads them as JSON
    this.endRecording = function(){
        if (!isRecording){
            console.warn('RotatingLog :: endRecording called while RotatingLog was not recording');
        }

        isRecording = false;
        endRotate();
    };

    this.init = function(options){
        var typeOfMaxSize = typeof options.maxSize;
        var typeOfSliding = typeof options.sliding;
        var typeOfRecEnabled = typeof options.recordingEnabled;
        var typeOfSaveRecords = typeof options.saveRecords;

        /* define custom maxSize
        * maxSize defines the max number of messages recorded
        */
        if (typeOfMaxSize !== 'undefined'){
            if (typeOfMaxSize !== 'number'){
                throw new Error('RotatingLog :: illegal type "' + typeOfMaxSize + '" for maxSize, "number" expected');
            } else {
                maxSize = options.maxSize;
                delete options.maxSize;
            }
        }

        /* enable "sliding window" recording
        * if enabled, the logger will record the last records only (<= maxSize)
        * if not enabled, the logger will automatically save a list of messages when length = maxSize 
        */
        if (typeOfSliding !== 'undefined'){
            if (typeOfSliding !== 'boolean'){
                throw new Error('RotatingLog :: illegal type "' + typeOfSliding + '" for sliding, "boolean" expected');
            } else {
                sliding = options.sliding;
                delete options.sliding;
            }
        }

        /* enable message recording
        * if disabled, no messages are recorded (even between startRecording and endRecording)
        */
        if (typeOfRecEnabled !== 'undefined'){
            if (typeOfRecEnabled !== 'boolean'){
                throw new Error('RotatingLog :: illegal type "' + typeOfRecEnabled + '" for recordingEnabled, "boolean" expected');
            } else {
                recordingEnabled = options.recordingEnabled;
                delete options.recordingEnabled;
            }
        }

        /* custom saveRecords function
        * allows you to use a custom function as saveRecords
        */
        if (typeOfSaveRecords === 'function'){
            saveRecords = options.saveRecords;
        } else if (typeOfSaveRecords !== 'undefined'){
            throw new Error('RotatingLog :: illegal type for saveRecords - expected function, got ' + valueType);
        }

        logger.init(options);
    };
};
angular.module('barney').factory('BarneyRotatingLogger', function(){
	barney.RotatingLog.init({
		enabled: true,
		level: 'log',
		recordingEnabled: true
	});

    return barney.RotatingLog;
});