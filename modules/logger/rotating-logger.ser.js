angular.module('barney.logger').factory('BarneyRotatingLogger', function(){

    /*
    var config = {
        log: true, 
         info: true, 
         warn: true,
         error: true,
        table: true,
        enabled:true
    };
    */
    var logger = new RotatingLog();

    return logger;
});