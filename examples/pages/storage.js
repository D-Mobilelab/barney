'use strict';

angular.module('example').controller('StorageCtrl', [
	'$scope', 'BarneyLogger', 'BarneyStorage',
	function($scope, Logger, Storage){

		$scope.typeStorage = 'localStorage';

		Logger.init({
			enabled: true
		});

		$scope.initStorage = function(){
			Storage.init({
				type: $scope.typeStorage,
				logger: Logger
			});
			
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

		$scope.getLocalStorageKey = function(){
			Storage.set('local-storage-key', 'pippo', { type: 'localStorage' });
			console.log('local-storage-key', Storage.get('local-storage-key', { type: 'localStorage' }));
		}

		$scope.getJsObjectKey = function(){
			Storage.set('local-jsobject-key', 'pippo', { type: 'jsObject' });
			console.log('local-jsobject-key', Storage.get('local-jsobject-key', { type: 'jsObject' }));
		}

		$scope.getCookieKey = function(){
			Storage.set('local-cookie-key', 'pippo', { type: 'cookie' });
			console.log('local-cookie-key', Storage.get('local-cookie-key', { type: 'cookie' }));
		}

		
	}
]);
