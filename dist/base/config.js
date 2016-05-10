if(!barney) { var barney = {}; }
barney.Config = new function(){

    this.init = function(options){
        if(options && options.config){
            this.config = options.config;
        }
    };

    this.get = function(value){
        var falseValues = ['', 0, '0', null, 'null', false, 'false'];
        value = value.toUpperCase();
        if(falseValues.indexOf(this.config[value]) !== -1){
            return false;
        } else {
            return this.config[value];
        }
    };

    this.list = function(){
        return this.config;
    };

};