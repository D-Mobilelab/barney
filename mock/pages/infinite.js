'use strict';

angular.module('mock').controller('InfiniteCtrl', 
     function($scope) {

        $scope.enableInfinite = false;
        $scope.data = [];
        $scope.page = 0;
        
        $scope.foo = function(){
            $scope.enableInfinite = false;
            for(var i = $scope.page; i < $scope.page + 70; i++){
                 $scope.data.push(i);
            }
            $scope.page += 70;
            $scope.enableInfinite = true;
             if($scope.page === 350)
                $scope.enableInfinite = false;
        }

        $scope.foo();
});
