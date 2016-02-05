'use strict';

describe('DICT -', function () {

	var DictProvider;

	beforeEach(module('barney.dict'));

	beforeEach(inject(function (_BarneyDict_) {
		DictProvider = _BarneyDict_;
	}));

	describe('default -', function () {
		beforeEach(function() {
			DictProvider.init();
		});

		it('if get a existent key, then it returns key value', function(){
			expect(DictProvider.get('VALUED_KEY')).toEqual(DICTIONARY.VALUED_KEY);
		});

		it('if get a existent key to a filter, then it returns key value', inject(function ($filter) {
			expect($filter('dict')('VALUED_KEY')).toBe('Hello world!');
		}));

		it('if get a inexistent key, then it returns void string', function(){
			expect(DictProvider.get('NULL_KEY')).toEqual('');
		});

		it('if get a inexistent key to a filter, then it returns void string', inject(function ($filter) {
			expect($filter('dict')('NULL_KEY')).toBe('');
		}));

		it('if call list(), then it returns list keys', function(){
			expect(DictProvider.list()).toEqual(DICTIONARY);
		});
	});

	describe('all -', function () {
		beforeEach(function() {
			DictProvider.init({
				showKey: 'all'
			});
		});

		it('if get a existent key, then it returns key name enclosed in square brackets', function(){
			expect(DictProvider.get('VALUED_KEY')).toEqual('[[VALUED_KEY]]');
		});

		it('if get a existent key to a filter, then it returns [[VALUED_KEY]]', inject(function ($filter) {
			expect($filter('dict')('VALUED_KEY')).toBe('[[VALUED_KEY]]');
		}));

		it('if get a inexistent key to a filter, then it returns [[NULL_KEY]]', inject(function ($filter) {
			expect($filter('dict')('NULL_KEY')).toBe('[[NULL_KEY]]');
		}));

		it('if get a inexistent key, then it returns key name enclosed in square brackets', function(){
			expect(DictProvider.get('NULL_KEY')).toEqual('[[NULL_KEY]]');
		});
	});

	describe('missing -', function () {
		beforeEach(function() {
			DictProvider.init({
				showKey: 'missing'
			});
		});

		it('if get a existent key, then it returns key value', function(){
			expect(DictProvider.get('VALUED_KEY')).toEqual(DICTIONARY.VALUED_KEY);
		});

		it('if get a existent key to a filter, then it returns key value', inject(function ($filter) {
			expect($filter('dict')('VALUED_KEY')).toBe(DICTIONARY.VALUED_KEY);
		}));

		it('if get a inexistent key, then it returns key name enclosed in square brackets', function(){
			expect(DictProvider.get('NULL_KEY')).toEqual('[[NULL_KEY]]');
		});

		it('if get a inexistent key to a filter, then it returns [[NULL_KEY]]', inject(function ($filter) {
			expect($filter('dict')('NULL_KEY')).toBe('[[NULL_KEY]]');
		}));
	});

	describe('Dict Directive with default', function(){
		var $rootScope, $scope, $compile, element, directiveScope, 
			compileDirective;

		beforeEach(function() {
			DictProvider.init();

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

		it('should contain Hello World', function(){
			compileDirective('<dict key="VALUED_KEY"></dict>');
			expect(element.html()).toContain('Hello world!');
		});

		it('should contain nothing', function(){
			compileDirective('<dict key="NULL_KEY"></dict>');
			expect(element.html()).toEqual('');
		});
	});	

	describe('Dict Directive with all', function(){
		var $rootScope, $scope, $compile, element, directiveScope, 
			compileDirective;

		beforeEach(function() {
			DictProvider.init({
				showKey: 'all'
			});

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

		it('should contain [[VALUED_KEY]]', function(){
			compileDirective('<dict key="VALUED_KEY"></dict>');
			expect(element.html()).toContain('[[VALUED_KEY]]');
		});

		it('should contain NULL_KEY', function(){
			compileDirective('<dict key="NULL_KEY"></dict>');
			expect(element.html()).toContain('[[NULL_KEY]]');
		});
	});	


});