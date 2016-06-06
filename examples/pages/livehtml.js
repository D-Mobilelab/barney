'use strict';

angular.module('example').controller('LivehtmlCtrl', 
     ['$scope', 
     function($scope) {

        $scope.content = '<a ng-click="test()">test</a>';
        $scope.content += '<script live-script src="//widgets.infostradasports.com/gns.widget.loader.js" data-widget_id="buongiorno-euro2016-schedule-it"></script>';
        $scope.content += '<script live-js>console.log("it works");</script>';

        $scope.test = function(){
            window.alert('TEST');
        }
    }
]);
