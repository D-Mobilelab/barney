'use strict';

angular.module('mock').controller('ConfigCtrl', [
	'BarneyConfig', 'BarneyLogger', '$scope',
	function(Config, Logger, $scope){
        $scope.listObject = "";
		/*
		Call init method to set notExistValue param
		Allowed notExistValue values: null, false, 0 or string
		*/
		Config.init({config:CONFIG});

		$scope.list = function(){
            $scope.listObject = JSON.stringify(Config.list(),null,2);
        }

        $scope.value = function(){
            $scope.configValue = Config.get($scope.string);
        }
	}
]);
