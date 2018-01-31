export default ($rootScope) => {

    $rootScope.meta = {};
    $rootScope.defaultMeta = {};

    var service = {

        init: function(metatags){
            for(var key in metatags){
                $rootScope.defaultMeta[key] = metatags[key];
                $rootScope.meta[key] = metatags[key];
            }

            // revert to default keys
            var _this = this;
            $rootScope.$on('$routeChangeStart', function(){
                _this.revert();
            });
        },

        get: function(key){
            if(!!$rootScope.meta[key]){
                return $rootScope.meta[key];
            } else {
                return '';
            }
        },

        set: function(metatags){
            for(var key in metatags){
                $rootScope.meta[key] = metatags[key];
            }
        },

        list: function(){
            return $rootScope.meta;
        },
        
        defaults: function(){
            return $rootScope.defaultMeta;
        },

        revert: function(){
            for(var key in $rootScope.defaultMeta){
                $rootScope.meta[key] = $rootScope.defaultMeta[key];
            }
        }

    };

    return service;
};