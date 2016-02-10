'use strict';

angular.module('example').controller('MetaCtrl', [
	'$scope', '$rootScope', 'BarneyMeta',
	function($scope, $rootScope, Meta){

		Meta.set({
			title: "meta title"
		});

		console.log("current", Meta.list());

	}
]);
