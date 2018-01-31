import angular from 'angular';

export default () => {
    var config = {}, upperCase = false;  

    var getNestedKey = function(object, key) {
        key = key.replace(/\[(\w+)\]/g, '.$1');
        key = key.replace(/^\./, '');
        var a = key.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in object) {
                object = object[k];
            } else {
                return undefined;
            }
        }
        return object;
    };
    
    var myProvider = {
        
        init: function(options){
            if(options && options.config){
                config = options.config;
                upperCase = options.upperCase || false;
            }
        },

        get: function(value){
            var falseValues = ['', 0, '0', null, 'null', false, 'false'];
            value = upperCase ? value.toUpperCase() : value;
            var confValue = value.indexOf('.') !== -1 ? getNestedKey(config, value) : config[value];
            if(falseValues.indexOf(confValue) !== -1){
                return false;
            } else {
                return confValue;
            }
        },

        list: function(){
            return config;
        }
        
    };

    angular.extend(this, myProvider);
    this.$get = [function() {
        return this;
    }];
};