angular.module('barney').factory('BarneyLogger', function(){

    BarneyBaseLogger.init({
        enabled: true,
        level: 'log'
    });

    return BarneyBaseLogger;
});