'use strict';

angular.module('mock').controller('MetaTwoCtrl', [
	'$scope', 'BarneyMeta',
	function($scope, Meta){

		Meta.set({
			description: "meta description"
		});

		console.log("current", Meta.list());

	}
]);
