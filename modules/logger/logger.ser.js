angular.module('barney').factory('BarneyLogger', function(){

    BarneyBaseLog.init({
        enabled: true,
        level: 'log'
    });

    return BarneyBaseLog;
});