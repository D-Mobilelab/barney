export default ($rootScope) => {

    $rootScope.meta = {};
    $rootScope.defaultMeta = {};

    this.init = function(metatags){
        for(var key in metatags){
            $rootScope.defaultMeta[key] = metatags[key];
            $rootScope.meta[key] = metatags[key];
        }

        // revert to default keys
        var _this = this;
        $rootScope.$on('$routeChangeStart', function(){
            _this.revert();
        });
    };

    this.get = function(key){
        if(!!$rootScope.meta[key]){
            return $rootScope.meta[key];
        } else {
            return '';
        }
    };

    this.set = function(metatags){
        for(var key in metatags){
            $rootScope.meta[key] = metatags[key];
        }
    };

    this.list = function(){
        return $rootScope.meta;
    };

    this.defaults = function(){
        return $rootScope.defaultMeta;
    };

    this.revert = function(){
        for(var key in $rootScope.defaultMeta){
            $rootScope.meta[key] = $rootScope.defaultMeta[key];
        }
    };

    return this;
};