
'use strict';

describe('INFINITE', function() {
    var $rootScope, $scope, $compile, $timeout, element, directiveScope, compileDirective;

    beforeEach(function(){
        module('barney.infinite');     

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
    })

    



    //afterEach(function() {
 //   dealoc(element);
    //});

    /*xit('should test infinite directive html', function(){
                $compile(element)(scope);
                    scope.flag = true;
                    scope.data = [];
                    var start = 0, step = 10;

                    scope.callApi =  function(aftercallme){
                            for(var i=start; i < start+step; i++){
                                    scope.data.push(i);
                            }
                            start += step;
                            aftercallme();
                            timeout.flush();
                        };
                 expect(element.find('p').length).toEqual(0);

    });

    it('should test infinite directive html with scroll', function(){
                    scope.flag = true;
                    scope.data = [];
                    var start = 0, step = 10;

                    scope.callApi =  function(aftercallme){

                            for(var i=start; i < start+step; i++){
                                    scope.data.push(i);
                            }

                            start += step;

                            aftercallme();
                        };
                    $compile(element)(scope);
                    element.isolateScope().enable = true;
                    scope.$digest();
                    expect(element.find('p').length).toBe(10);
    });*/

    xit('Should do enable remain false', function(){
        scope.callApi =  function(aftercallme){
        };
        scope.flag = true;
        scope.data = [];
        $compile(element)(scope);
        scope.$digest();
        expect(element.isolateScope().enable).toBe(false);
    });

    xit('Should do enable be true', function(){
        scope.flag = true;
        scope.data = [];
        var start=0, step=10;

        scope.callApi =  function(aftercallme){

            for(var i=start; i < start+step; i++){
                    scope.data.push(i);
            }

            start += step;

            aftercallme();
        };
        $compile(element)(scope);
        scope.$digest();
        spyOn(element.isolateScope(), 'callback');

        expect(element.isolateScope().callback).toHaveBeenCalled();
    });

});