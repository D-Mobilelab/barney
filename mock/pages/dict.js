'use strict';

angular.module('mock').controller('DictCtrl', [
	'$scope', 'BarneyDict',
	function($scope, Dict){
        
        $scope.mode = 'normal';

        $scope.$watch('mode', function(){
        	Dict.init({
				showKey: $scope.mode
			})
			try {
				$scope.$digest();
			} 
			catch(err) {}
        });

	}
]);
