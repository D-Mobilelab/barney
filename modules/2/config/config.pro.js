angular.module('barney.config').provider('BarneyConfig', function(){
    
    var myProvider = {
        get: function(value){
            var falseValues = ['', '0', null, 'null', false, 'false'];
            if(falseValues.indexOf(CONFIG[value]) != '-1'){
                return false;
            } else {
                return CONFIG[value];
            }
        }
    }

    // aggiunge a this il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .config()
    angular.extend(this, myProvider);

    // richiama il myProvider riportato sopra,
    // in questo modo si possono chiamare i methods da .run()
    this.$get = [function() {
        return this;
    }];

})