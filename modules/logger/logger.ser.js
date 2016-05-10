angular.module('barney').factory('BarneyLogger', function(){

    barney.BaseLogger.init({
        enabled: true,
        level: 'log'
    });

    return barney.BaseLogger;
});