'use strict';

angular.module('example').controller('InfiniteCtrl', 
     ['$scope', '$timeout', 
     function($scope, $timeout) {

        $scope.flag = true;
        $scope.data = [];
        var start = 0, step = 10;

        $scope.callApi = function(aftercallme){
            console.log("callApi - trigger!");
            
            // $timeout(function(){
                console.log("setTimeout");

                for(var i=start; i < start+step; i++){
                    $scope.data.push(i);
                }
                start += step;

                aftercallme();
            // }, 1);
        }

       
}]);
