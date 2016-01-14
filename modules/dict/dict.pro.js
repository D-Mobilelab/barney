angular.module('barney.dict').provider('BarneyDict', [
    'DictObj',
    function (DictObj) {

        // METODI DEL PROVIDER
        var myProvider = {
            options: {
                showKey: false
            },

            init: function(options){
                if(options){
                    this.options = options;
                }
            },

            get: function(key){
                // convert key to upper case
                key = key.toUpperCase();

                if(this.options.showKey === 'all'){

                    // 'all case': 
                    // valued keys : show key name
                    // void keys : show key name
                    return '[[' + key + ']]';

                } else if(this.options.showKey === 'missing'){

                    // 'missing' case:
                    // valued keys : show value of key
                    // void keys : show key name
                    if(!!DictObj[key]) {
                        return DictObj[key];
                    } else {
                        return '[[' + key + ']]';
                    }

                } else {

                    // standard case
                    // valued keys : show value of key
                    // void keys : show void string
                    if(!!DictObj[key]) {
                        return DictObj[key];
                    } else {
                        return '';
                    }

                }
            },

            list: function(){
                return DictObj;
            }
        };

        // aggiunge a this il myProvider riportato sopra,
        // in questo modo si possono chiamare i methods da .config()
        angular.extend(this, myProvider);
        // richiama il myProvider riportato sopra,
        // in questo modo si possono chiamare i methods da .run()
        this.$get = [function() {
            return this;
        }];
    }
]);
