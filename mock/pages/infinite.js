'use strict';

angular.module('mock').controller('InfiniteCtrl', 
     ['$scope', '$timeout', 
     function($scope, $timeout) {

        // $scope.enableInfinite = false;
        // $scope.data = [];
        // $scope.page = 0;
        
        // $scope.foo = function(){
        //     $scope.enableInfinite = false;
        //     for(var i = $scope.page; i < $scope.page + 70; i++){
        //          $scope.data.push(i);
        //     }
        //     $scope.page += 70;
        //     $scope.enableInfinite = true;
        //      if($scope.page === 350)
        //         $scope.enableInfinite = false;
        // }

        // $scope.foo();

        $scope.flag = true;
        $scope.data = [];
        var start = 0, step = 10;

        $scope.callApi = function(aftercallme){
            console.log("callApi - trigger!");
            
            $timeout(function(){
                console.log("setTimeout");

                for(var i=start; i < start+step; i++){
                    $scope.data.push(i);
                }
                start += step;

                aftercallme();
            }, 1);
        }

       
}]);
