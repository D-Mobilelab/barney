
'use strict';

describe('INFINITE', function() {
    var $rootScope, $scope, $compile, $timeout, element, directiveScope, compileDirective;

    beforeEach(function(){
        module('barney');     

        inject(function(_$rootScope_, _$compile_, _$timeout_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $timeout = _$timeout_;

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

    describe("callback function -", function(){
        beforeEach(function(){
            $scope.flag = true;
            $scope.callApi = function(aftercallme){ aftercallme(); };
            spyOn($scope, 'callApi').and.callThrough();
            compileDirective('<div infinite-scroll infinite-enable="flag" infinite-callback="callApi"></div>');
        })

        it('callback has been called', function(){
            expect($scope.callApi).toHaveBeenCalled();
        });

        it('enable is false after callback', function(){
            expect(directiveScope.enable).toBe(false);
        });
    });
});