angular.module('barney.logger').factory('BarneyLogger', function(){

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
    var logger = new BaseLogger();

    return logger;
});