'use strict';

describe('First test', function () {

	// load the controller's module
	// beforeEach(module('barney.analytics'));

	// var HomepageCtrl, scope;

	// Initialize the controller and a mock scope
	// beforeEach(inject(function ($controller, $rootScope) {
	// 	scope = $rootScope.$new();
	// 	HomepageCtrl = $controller('HomepageCtrl', {
	// 		$scope: scope
	// 	});
	// }));

	it('right test', function () {
		expect(true).toBe(true);
	});

	it('wrong test', function () {
		expect(false).toBe(true);
	});
});