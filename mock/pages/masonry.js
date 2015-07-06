'use strict';

angular.module('mock').controller('MasonryCtrl', [
	'$scope',
	function($scope){

		$scope.array = [
			{
				name: 'Mario Rossi',
				image: 'http://placekitten.com/g/200/300'
			},
			{
				name: 'Giuseppe Bianco',
				image: 'http://placekitten.com/g/200/300'
			},
			{
				name: 'Carmelo Verde',
				image: 'http://placekitten.com/g/200/300'
			},
			{
				name: 'Enzo Giallo',
				image: 'http://placekitten.com/g/200/300'
			},
			{
				name: 'Maurizio Rosa',
				image: 'http://placekitten.com/g/200/300'
			}
		]

	}
]);
