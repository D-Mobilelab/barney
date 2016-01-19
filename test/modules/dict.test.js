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

		it('if get a inexistent key, then it returns void string', function(){
			expect(DictProvider.get('NULL_KEY')).toEqual('');
		});

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

		it('if get a inexistent key, then it returns key name enclosed in square brackets', function(){
			expect(DictProvider.get('NULL_KEY')).toEqual('[[NULL_KEY]]');
		});
	});

});