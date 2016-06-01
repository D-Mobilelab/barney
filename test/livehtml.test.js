'use strict';

describe('LIVEHTML -', function () {

	var $rootScope, $scope, $compile, element, directiveScope, 
		compileDirective;

	beforeEach(module('barney'));

	describe('main -', function () {

		beforeEach(function() {

			inject(function(_$rootScope_, _$compile_) {
	            $rootScope = _$rootScope_;
	            $scope = _$rootScope_;
	            $compile = _$compile_;

	            compileDirective = function(template){
	                element = angular.element(template);
	                $compile(element)($scope);
	                $scope.$digest();
	                directiveScope = element.isolateScope();
	                $rootScope.$apply();
	                $scope.$apply();
	            }
	        });
		});

		it('contain ', function(){
			$scope.content = "<p>hello world</p>"
			compileDirective('<div live-html="content"></div>');
			console.log(element);
			expect(element.html()).toContain('hello world');
		});
	});

});