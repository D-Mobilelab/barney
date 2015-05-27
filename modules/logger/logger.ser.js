'use strict';

angular.module('barney.logger').factory('BarneyLogger', [
	'$log',
	function($log){

		this.log = function(){
			$log.log(Array.prototype.slice.call(arguments));
		}

		return this;

	}
]);