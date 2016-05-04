'use strict';

angular.module('example').controller('LivehtmlCtrl', 
     ['$scope', 
     function($scope) {

        $scope.content = "<a ng-click='test()'>TEST ME</a>";

        $scope.test = function(){
            window.alert('TEST');
        }
    }
]);
