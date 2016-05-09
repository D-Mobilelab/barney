angular.module('barney').factory('BarneyLogger', function(){
	BaseLogger.init({
		enabled: true,
		level: 'log'
	});
	
    return BaseLogger;

});