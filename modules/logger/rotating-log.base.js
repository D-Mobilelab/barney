var BarneyRotatingLog = new function(){

    // IMPORTANT: requires Logger
    var logger = BarneyBaseLog;

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
        if (recordingEnabled && logger.getConfig().enabled){
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