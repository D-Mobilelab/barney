angular.module('barney.history').factory('BarneyHistory',
    ['$location', '$rootScope',
    function($location, $rootScope){
        
        return {

            previousPath: null,
            
            // inizializza il modulo
            init: function(){
                var _this = this;
                $rootScope.$on('$locationChangeSuccess', function(event, newurl, oldurl){
                    if(newurl !== oldurl){
                        _this.previousPath = oldurl.substr(oldurl.indexOf('#!') + 2);
                    }
                });
            },

            // restituisce la URL dell'ultima pagina visitata
            get: function(){
                var _this = this;
                return _this.previousPath;
            },

            // torna indietro all'ultima pagina visitata
            goBack: function(){
                var _this = this;
                $location.url(_this.previousPath);
            }

        };

    }
]);