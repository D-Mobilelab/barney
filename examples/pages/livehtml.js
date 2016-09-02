'use strict';

angular.module('example').controller('LivehtmlCtrl', 
     ['$scope', 
     function($scope) {

        $scope.content = '<div>';
        $scope.content += '<a ng-click="test()">TEST ME</a>';
        $scope.content += '<script>console.log("it is inside (one)");</script>';
        $scope.content += '<script src="//widgets.infostradasports.com/gns.widget.loader.js" data-widget_id="buongiorno-euro2016-schedule-it">console.log("it is inside (two)");</script>';
        $scope.content += '</div>';

        $scope.test = function(){
            window.alert('TEST');
        }
    }
]);
