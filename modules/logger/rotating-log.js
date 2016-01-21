(function(name, parent){
    var RotatingLog = function(){

        // IMPORTANT: requires Logger
        var logger = new BaseLogger();

        // this Array will contain each message
        var messages = [];
        // this is the max size of messages (before it gets downloaded)
        var maxSize = 100;

        // true iff logger is enabled (by config) to record messages
        var recordingEnabled = true;
        // true iff logger is recording messages
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

        // expose Logger's main methods
        this.log = logger.log;
        this.info = logger.info;
        this.table = logger.table;
        this.warn = logger.warn;
        this.error = logger.error;

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

        var rotatingEmit = function(level, args){
            if (messages.length >= maxSize){
                if (!sliding){
                    endRotate();
                } else {
                    messages.shift();
                }
            }

            // record messages
            if (recordingEnabled && isRecording) {
                messages.push([new Date(), window.location.href, level, args]);
            }
            // also log on console
            console[level](args);
        };

        this.init = function(options){
            var typeOfMaxSize = typeof options.maxSize;
            var typeOfSliding = typeof options.sliding;
            var typeOfRecEnabled = typeof options.recordingEnabled;

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
            valueType = typeof options.saveRecords;
            if (valueType === 'function'){
                saveRecords = options.saveRecords;
            } else if (valueType !== 'undefined'){
                throw new Error('RotatingLog :: illegal type for saveRecords - expected function, got ' + valueType);
            }

            // this logger works with rotatingEmit
            options.emit = rotatingEmit;
            logger.init(options);
        };

    };
    parent[name] = RotatingLog;
})('RotatingLog', window);