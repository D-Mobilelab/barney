'use strict';

angular.module('mock').controller('InfiniteCtrl', 
     function($scope) {

        $scope.busy = false;
        $scope.data = [];
        $scope.page = 0;
        
        $scope.foo = function(){
            $scope.enable = false;
            for(var i = $scope.page; i < $scope.page + 70; i++){
                 $scope.data.push(i);
            }
            $scope.page += 70;
            $scope.enable = true;
        }

        $scope.foo();
});
