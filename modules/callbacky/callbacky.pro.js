angular.module('barney.callbacky').provider('BarneyCallbacky', function () {
    
    var myProvider = {

        set: {},

        verbose: false,
        logger: {
            log: function(){},
            info: function(){},
            warn: function(){},
            error: function(){}
        },

        // inizializza il modulo, prende come parametri:
        // - verbose: logga tutte le operazioni eseguite sul modulo (default: false)
        // - logger: oggetto che si occuperà di loggare (per esempio window.console o BarneyLogger, default: null)
        init: function(options){
            if(options){
                if(typeof(options.verbose) !== 'undefined'){
                    this.verbose = options.verbose;
                }
                if(typeof(options.logger) !== 'undefined'){
                    this.logger = options.logger;
                }
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'init', this);
            }
        },

        // associa una funzione (method) ad una stringa (key),
        // in questo modo quando viene chiamato trigger() sulla quella stringa, viene chiamata la funzione passata
        // esempio: bind('hello', function(){ alert('world')) } > trigger('hello') > esegue alert('world')
        bind: function(key, method){
            if(!this.set[key]){ 
                this.set[key] = [];
            }
            this.set[key].push(method);
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'bind', key, method);
            }
        },

        // esegue una funzione precedentemente associata con bind() alla stringa passata, parametri:
        // - key: stringa precedentemente associata con bind alla funzione da eseguire
        // - arg: argomenti da passare alla funzione da eseguire
        // esempio: bind('hello', function(args){ alert(args)) } > trigger('hello', 'world') > esegue alert('world')
        trigger: function(key, arg){
            if(this.set[key] && this.set[key].length > 0){
                for(var i in this.set[key]){
                    this.set[key][i].call(this, arg);
                }
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'trigger', key, arg);
            }
        },

        // elimina la funzione precedentemente associata, con bind, alla stringa "key"
        clean: function(key){
            if(this.set[key]){
                this.set[key] = [];
            }
            if(this.verbose){
                this.logger.log('BarneyCallbacky', 'clean', key);
            }
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

});