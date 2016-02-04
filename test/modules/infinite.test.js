
'use strict';

describe('INFINTE', function() {
  var element, timeout, mockedWindow, $compile, scope, $exceptionHandler, $compileProvider;

  beforeEach(function(){
    module('barney.infinite');     
  });

  beforeEach(module(function(_$compileProvider_) {
    $compileProvider = _$compileProvider_;
  }));


  beforeEach(module(function($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(inject(function(_$compile_, $rootScope, _$exceptionHandler_, _$timeout_,_$window_) {
    $compile = _$compile_;
    $exceptionHandler = _$exceptionHandler_;
    timeout = _$timeout_;
    mockedWindow = _$window_
    scope = $rootScope.$new();
  }));


  //afterEach(function() {
 //   dealoc(element);
  //});

  it('should test infinite directive html', function(){
        element = angular.element(
          '<div id="spyThis" infinite-scroll infinite-enable="flag" infinite-callback="callApi" >'+
              '<p ng-repeat="item in data">' +
                '{{item}}' +
              '</p>'+
            '</div>');
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
          scope.$digest();

         expect(element.find('p').length).toEqual(10);

  });

  it('should test infinite directive html with scroll', function(){
        element = angular.element(
          '<div id="spyThis" infinite-scroll infinite-enable="flag" infinite-callback="callApi" >'+
              '<p ng-repeat="item in data">' +
                '{{item}}' +
              '</p>'+
            '</div>');
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
          mockedWindow.scrollTo(1,100);
          element.isolateScope().enable = true;
          scope.$digest();


          expect(element.find('p').length).toBe(10);
  });
});