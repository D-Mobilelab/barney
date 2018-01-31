export default class {
    /*@ngInject*/
    $get($http) {
        var parameters = {
            showKey: false
        };

        return {
            init: function(options){
                if(options){
                    parameters = options;
                }
            },
    
            get: function(key){
                // convert key to upper case
                key = key.toUpperCase();
    
                if(parameters.showKey === 'all'){
    
                    // 'all case': 
                    // valued keys : show key name
                    // void keys : show key name
                    return '[[' + key + ']]';
    
                } else if(parameters.showKey === 'missing'){
    
                    // 'missing' case:
                    // valued keys : show value of key
                    // void keys : show key name
                    if(!!parameters.dict[key]) {
                        return parameters.dict[key];
                    } else {
                        return '[[' + key + ']]';
                    }
    
                } else {
    
                    // standard case
                    // valued keys : show value of key
                    // void keys : show void string
                    if(!!parameters.dict[key]) {
                        return parameters.dict[key];
                    } else {
                        return '';
                    }
    
                }
            },
    
            list: function(){
                return parameters.dict;
            }
        };
    }
};