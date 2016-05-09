angular.module('barney').factory('BarneyLogger', function(){

    BarneyLogger.init({
        enabled: true,
        level: 'log'
    });

    return BarneyBaseLogger;
});