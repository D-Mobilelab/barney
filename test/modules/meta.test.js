'use strict';

describe('META -', function () {

	var MetaService;	

	beforeEach(module('barney.meta'));

	beforeEach(inject(function (_BarneyMeta_) {
		MetaService = _BarneyMeta_;
	}));

	describe('main -', function () {
		var defaultKeys, newKeys;
		
		beforeEach(function() {
			defaultKeys = { 
				title: 'Default page title' 
			};
			newKeys = { 
				title: 'New title' 
			};

			MetaService.init(defaultKeys);
		});

		it('if get a key, then it returns default key', function(){
			expect(MetaService.get('title')).toEqual(defaultKeys.title);
		});

		it('if get a non key, then it returns null', function(){
			expect(MetaService.get('buoh')).toEqual('');
		});

		it('if set a new value as key and get key, then it returns updated value', function(){
			MetaService.set(newKeys);
			expect(MetaService.get('title')).toEqual(newKeys.title);
		});

		it('if set a new value as key, revert key and get key, then it returns updated value', function(){
			MetaService.set(newKeys);
			MetaService.revert();
			expect(MetaService.get('title')).toEqual(defaultKeys.title);
		});

		it('if call defaults(), then it returns a list of default keys', function(){
			expect(MetaService.defaults()).toEqual(defaultKeys);
		});

		it('if call list(), then it returns a list of updated keys', function(){
			MetaService.set(newKeys);
			expect(MetaService.list()).toEqual(newKeys);
			MetaService.revert();
			expect(MetaService.list()).toEqual(defaultKeys);
		});
	});

});