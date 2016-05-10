var BarneyStorage = new function(){

    var selectedStorage = null;

    var logger = {
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    var storages = {
        'cookie': BarneyStorageBiscuit,
        'localStorage': BarneyStorageDepot,
        'jsObject': BarneyStorageChicken
    };

    this.init = function(params){
        if (params){
            // SETUP STORAGE TYPE
            if(!!params.type){
                selectedStorage = storages[params.type];
            }
            
            // SETUP LOGGER
            if(!!params.logger){
                if(params.logger === true){
                    logger = window.console;
                } else {
                    logger = params.logger;
                }
            }
        }
        logger.log('BarneyStorage', 'init', params, selectedStorage, logger);
    };

    this.set = function(key, value, options){
        if(!!options && !!options.type){
            storages[options.type].set(key, value, options);
        } else {
            selectedStorage.set(key, value, options);
        }
        // selectedStorage.set(key, value, exdays);
        logger.log('BarneyStorage', 'set', key, value, options);
    };

    this.get = function(key, options){
        var value;
        if(!!options && !!options.type){
            value = storages[options.type].get(key, options);
        } else {
            value = selectedStorage.get(key, options);
        }
        // var value = selectedStorage.get(key);
        logger.log('BarneyStorage', 'get', key, value, options);
        return value;
    };

    this.getMultiple = function(keys, options){
        var values;
        if(!!options && !!options.type){
            values = storages[options.type].getMultiple(keys, options);
        } else {
            values = selectedStorage.getMultiple(keys, options);
        }
        // var values = selectedStorage.getMultiple(keys);
        logger.log('BarneyStorage', 'getMultiple', values, options);
        return values;
    };

    this.setMultiple = function(params, options){
        if(!!options && !!options.type){
            storages[options.type].setMultiple(params, options);
        } else {
            selectedStorage.setMultiple(params, options);
        }
        // selectedStorage.setMultiple(params, exdays);
        logger.log('BarneyStorage', 'setMultiple', params, options);
    };
   
    this.delete = function(key, options){
        if(!!options && !!options.type){
            storages[options.type].delete(key, options);
        } else {
            selectedStorage.delete(key, options);
        }
        // selectedStorage.delete(key);
        logger.log('BarneyStorage', 'delete', key, options);
    };

    this.isLocalStorageSupported = function(){
        var name = 'test';
        try {
            localStorage.setItem(name, name);
            localStorage.getItem(name);
            localStorage.removeItem(name);
            return true;
        } catch (e) {
            return false;
        }
    };

};