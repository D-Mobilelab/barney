'use strict';

angular.module('mock').controller('StorageCtrl', [
	'$scope', 'BarneyStorage',
	function($scope, Storage){

		Storage.set('true-key', 'pippo');
		console.log("true-key", Storage.get('true-key'));

		Storage.set('deleted-key', 'pluto');
		Storage.delete('deleted-key');
		console.log("deleted-key", Storage.get('deleted-key'));

		Storage.setMultiple({
			first: 'one',
			second: 'two'
		});
		console.log("first", Storage.get('first'));
		console.log("second", Storage.get('second'));

		console.log("inexistent-key", Storage.get('inexistent-key'));
	}
]);
