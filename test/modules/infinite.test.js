
'use strict';

describe('INFINTE', function() {
  var element, timeout, mockedWindow, mockedDocument, $compile, scope,
  $exceptionHandler, $compileProvider;

  beforeEach(function(){
    // mock $window and $location providers
    angular.mock.module(function($provide) {
      $provide.value('window', {
        innerHeight: 0,
        pageYOffset: 0
      });

      $provide.value('document', {

        documentElement : {
          offsetHeight: 0,
          clientHeight: 0,
          scrollHeight: 0
        },

        body: {
          scrollHeight: 0 ,
          offsetHeight: 0
        }

      });

      $provide.value('$element', [{offsetHeight:500}]);


    });
    // get barney module
    module('barney.infinite');     

    inject(function(_$compile_, $rootScope,
    _$timeout_, _$document_) {
    $compile = _$compile_;
    timeout = _$timeout_;
    //mockedWindow = _$window_;
    //mockedDocument = _$document_;
    scope = $rootScope.$new();
    element = angular.element(
      '<div id="spyThis" infinite-scroll infinite-enable="flag" infinite-callback="callApi" >'+
          '<p ng-repeat="item in data">' +
            '{{item}}' +
          '</p>'+
        '</div>');
    })
  });

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

  it('Should do enable remain false', function(){
    scope.callApi =  function(aftercallme){
    };
    scope.flag = true;
    scope.data = [];
    $compile(element)(scope);
    scope.$digest();
    expect(element.isolateScope().enable).toBe(false);
  });

  it('Should do enable be true', function(){
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