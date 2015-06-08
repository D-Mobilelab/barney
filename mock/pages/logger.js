'use strict';

angular.module('mock').controller('LoggerCtrl', [
	'BarneyLogger',
	function(BarneyLogger){
        BarneyLogger.log("Log test");
	}
]);
