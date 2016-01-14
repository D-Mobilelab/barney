angular.module('barney.logger').factory('BarneyLogger', [
    '$log',
    function($log){

        this.enabled = false;

        this.init = function(object){
            if(!!object){
                this.enabled = !!object.enabled;
            }
        };

        this.isEnabled = function(){
            return this.enabled;
        };

        this.log = function(){
            if(this.enabled){
                $log.log(Array.prototype.slice.call(arguments));
            }
        };

        this.info = function(){
            if(this.enabled){
                $log.info(Array.prototype.slice.call(arguments));
            }
        };

        this.debug = function(){
            if(this.enabled){
                $log.debug(Array.prototype.slice.call(arguments));
            }
        };

        this.warn = function(){
            if(this.enabled){
                $log.warn(Array.prototype.slice.call(arguments));
            }
        };

        this.error = function(){
            if(this.enabled){
                $log.error(Array.prototype.slice.call(arguments));
            }
        };

        return this;

    }
]);