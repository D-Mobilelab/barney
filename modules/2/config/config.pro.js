// (function() {  

    angular.module('barney.config').provider('BarneyConfig', function(){        
        
        var myProvider = {
            init: function(options){
                if(options && options.config){
                    this.config = options.config;
                }
            },

            get: function(value){
                value = value.toUpperCase();
                var falseValues = ['', 0, '0', null, 'null', false, 'false'];
                if(falseValues.indexOf(this.config[value]) !== -1){
                    return false;
                } else {
                    return this.config[value];
                }
            },

            list: function(){
                return this.config;
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

// })();