angular.module('barney').factory('BarneyRotatingLogger', function(){

    BarneyRotatingLog.init({
        enabled: true,
        level: 'log',
        recordingEnabled: true
    });

    return BarneyRotatingLog;
});