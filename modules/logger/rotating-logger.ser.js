angular.module('barney').factory('BarneyRotatingLogger', function(){
	barney.RotatingLog.init({
		enabled: true,
		level: 'log',
		recordingEnabled: true
	});

    return barney.RotatingLog;
});