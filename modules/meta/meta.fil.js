'use strict';

angular.module('barney.meta').filter('meta', 
	['BarneyMeta', 
	function(Meta) {

	return function(key) {
		return Meta.get(key);
	}

}]);