angular.module('barney.storage').provider('BarneyStorage',
    ['BarneyStorageBiscuitProvider', 'BarneyStorageDepotProvider', 'BarneyStorageChickenProvider',
    function (Biscuit, Depot, Chicken) {

        var Storage = {

            selectedStorage: null,
            logger: {
                log: function(){},
                info: function(){},
                warn: function(){},
                error: function(){}
            },
            
            storages: {
                'cookie': Biscuit,
                'localStorage': Depot,
                'jsObject': Chicken
            },

            // questo metodo inizializza lo storage
            // accetta come parametri:
            // "type" definisce lo storage predefinito per salvare variabili e può essere "cookie", "localStorage" e "jsObject" (default: null)
            // "logger" definisce l'insieme di funzioni usate come logger, se true prende window.console (deafult: null)
            init: function(params){
                if (params){
                    // SETUP STORAGE TYPE
                    if(!!params.type){
                        this.selectedStorage = this.storages[params.type];
                    }
                    
                    // SETUP LOGGER
                    if(!!params.logger){
                        if(params.logger === true){
                            this.logger = window.console;
                        } else {
                            this.logger = params.logger;
                        }
                    }
                }
                this.logger.log('BarneyStorage', 'init', params, this.selectedStorage, this.logger);
            },

            // setta una variabile (definita da key e value) nello storage predefinito
            // se definito options.type allora la setta nello storage passato ("cookie", "localStorage" o "jsObject")
            set: function(key, value, options){
                if(!!options && !!options.type){
                    this.storages[options.type].set(key, value, options);
                } else {
                    this.selectedStorage.set(key, value, options);
                }
                // this.selectedStorage.set(key, value, exdays);
                this.logger.log('BarneyStorage', 'set', key, value, options);
            },

            // prende una variabile (definita da key) dallo storage predefinito
            // se definito options.type allora la prende dallo storage passato ("cookie", "localStorage" o "jsObject")
            get: function(key, options){
                var value;
                if(!!options && !!options.type){
                    value = this.storages[options.type].get(key, value, options);
                } else {
                    value = this.selectedStorage.get(key, options);
                }
                // var value = this.selectedStorage.get(key);
                this.logger.log('BarneyStorage', 'get', key, value, options);
                return value;
            },

            // prende più variabili (definite dall'array keys) dallo storage predefinito
            // se definito options.type allora le prende dallo storage passato ("cookie", "localStorage" o "jsObject")
            getMultiple: function(keys, options){
                var values;
                if(!!options && !!options.type){
                    values = this.storages[options.type].getMultiple(keys, options);
                } else {
                    values = this.selectedStorage.getMultiple(keys, options);
                }
                // var values = this.selectedStorage.getMultiple(keys);
                this.logger.log('BarneyStorage', 'getMultiple', keys, values, options);
                return values;
            },

            // setta più variabili (definite dall'array keys) nello storage predefinito
            // se definito options.type allora le setta nello storage passato ("cookie", "localStorage" o "jsObject")
            setMultiple: function(params, options){
                if(!!options && !!options.type){
                    this.storages[options.type].setMultiple(params, options);
                } else {
                    this.selectedStorage.setMultiple(params, options);
                }
                // this.selectedStorage.setMultiple(params, exdays);
                this.logger.log('BarneyStorage', 'setMultiple', params, options);
            },

            // cancella una variabile (definita dalla chiave key) dallo storage predefinito
            // se definito options.type allora la cancella dallo storage passato ("cookie", "localStorage" o "jsObject")
            delete: function(key, options){
                if(!!options && !!options.type){
                    this.storages[options.type].delete(key, options);
                } else {
                    this.selectedStorage.delete(key, options);
                }
                // this.selectedStorage.delete(key);
                this.logger.log('BarneyStorage', 'delete', key, options);
            },

            // dici se il localstorage è supportato o no
            isLocalStorageSupported: function(){
                var name = 'test';
                try {
                    localStorage.setItem(name, name);
                    localStorage.getItem(name);
                    localStorage.removeItem(name);
                    return true;
                } catch (e) {
                    return false;
                }
            }

        };

        // aggiunge a this l'oggetto Dixie riportato sopra,
        // in questo modo si possono chiamare i methods da .config()
        angular.extend(this, Storage);
        // richiama il myProvider riportato sopra,
        // in questo modo si possono chiamare i methods da .run()
        this.$get = [function() {
            return this;
        }];
    }
]);