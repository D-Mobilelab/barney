'use strict';

angular.module('barney.dict').filter('barney_dict', 
	['BarneyDict', 
	function(Dict) {

	return function(key) {
		return Dict.get(key);
	}

}]);