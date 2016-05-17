'use strict';

describe('PROMISE -', function () {

	describe('VANILLA - ', function(){

		var PromiseLite = barney.Promise;

		describe('Promises without executor', function(){

			it('should be resolved manually', function(){
				var p = new PromiseLite();

				expect(p.isSettled()).toBe(false);

				p.resolve();

				expect(p.isSettled()).toBe(true);
			});

			it('should execute then-chains added before they\'re resolved', function(){
				var p = new PromiseLite();

				var thenValue = 42;

				p.then(function(value){
					return value + 1;
				}).then(function(value){
					thenValue = value + 1;
				});

				expect(thenValue).toBe(42);

				p.resolve(0);

				expect(thenValue).toBe(2);
			});

			it('should execute then-chains added after they\'re resolved', function(){
				var p = new PromiseLite();

				var thenValue = 42;

				expect(thenValue).toBe(42);

				p.resolve(0);

				p.then(function(value){
					return value + 1;
				}).then(function(value){
					return value + 1;
				}).then(function(value){
					thenValue = value + 1;
				});

				expect(thenValue).toBe(3);
			});

			it('should execute fail if then raises an error', function(){
				var p = new PromiseLite();
				
				var testReason;

				p.then(function(value){
					throw 'testError';
				}).fail(function(reason){
					testReason = reason;
				});

				expect(testReason).toBeUndefined();

				p.resolve();

				expect(testReason).toEqual('testError');
			});

			it('should throw an exception if then raises an error and there is no fail to catch it', function(){
				var p = new PromiseLite();
				
				var testError;

				p.then(function(value){
					throw 'testError';
				});

				try {
					p.resolve();
				} catch (err){
					testError = err;
				}

				expect(testError).toEqual('testError');
			});

			it('should throw an exception if fail raises an error and there is no other fail to catch it', function(){
				var p = new PromiseLite();
				
				var testError;

				p.fail(function(reason){
					throw 'testError';
				});

				try {
					p.reject();
				} catch (err){
					testError = err;
				}
				
				expect(testError).toEqual('testError');
			});

			it('should execute correctly then/fail-chains', function(){
				var p = new PromiseLite();
				
				var thenCalled1, thenCalled2, failCalled1, failCalled2;

				p.fail(function(reason){
					expect(undefined).toBe(null); // this should not be executed
				}).then(function(value){
					thenCalled1 = true;
					expect(value).toEqual(1);
					return value + 1;
				}).then(function(value){
					thenCalled2 = true;
					expect(value).toEqual(2);
					throw 'testError';
				}).then(function(value){
					expect(true).toBe(false); // this should not be executed
				}).fail(function(reason){
					failCalled1 = true;
					expect(reason).toEqual('testError');
					throw 42;
				}).then(function(){
					expect(true).toBe(6); // this should not be called
				}).fail(function(reason){
					failCalled2 = true;
					expect(reason).toEqual(42);
				});

				p.resolve(1);

				expect(thenCalled1).toBe(true);
				expect(thenCalled2).toBe(true);
				expect(failCalled1).toBe(true);
				expect(failCalled2).toBe(true);

			});

		});

		describe('Promises with executor', function(){

			it('should be resolved automatically if resolve is invoked in the executor (synchronous function)', function(){
				var p = new PromiseLite(function(resolve, reject){
					resolve();
				});

				expect(p.isFulfilled()).toBe(true);
			});

			it('should be resolved automatically if resolve is invoked in the executor (asynchronous function)', function(done){
				var p = new PromiseLite(function(resolve, reject){
					setTimeout(resolve, 1000);
				});

				p.then(function(){
					expect(p.isFulfilled()).toBe(true);
					done();
				})
				
			});

			it('should be rejected automatically if reject is invoked in the executor (synchronous function)', function(){
				var p = new PromiseLite(function(resolve, reject){
					reject();
				});

				expect(p.isRejected()).toBe(true);
			});

			it('should be rejected automatically if reject is invoked in the executor (asynchronous function)', function(done){
				var p = new PromiseLite(function(resolve, reject){
					setTimeout(reject, 1000);
				});

				p.fail(function(){
					expect(p.isRejected()).toBe(true);
					done();
				})
				
			});

			it('should throw an exception if the executor raises an error and there is no fail to catch it', function(){
				
				var testError;

				try {
					var p = new PromiseLite(function(resolve, reject){
						throw 'testError';
					});
				} catch (err){
					testError = err;
				}
				
				expect(testError).toEqual('testError');
			});
		});

		describe('Promise.all', function(){

			it('should be resolved if all the promises are resolved', function(){
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAll = PromiseLite.all([p1, p2, p3]);

				expect(pAll.isPending()).toBe(true);
				
				p1.resolve(1);

				expect(pAll.isPending()).toBe(true);

				p2.resolve(2);

				expect(pAll.isPending()).toBe(true);

				p3.resolve(3);

				expect(pAll.isFulfilled()).toBe(true);

				pAll.then(function(values){
					expect(values[0]).toEqual(1);
					expect(values[1]).toEqual(2);
					expect(values[2]).toEqual(3);
				});

			});

			it('should be rejected if any of the promises are rejected', function(){
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAll = PromiseLite.all([p1, p2, p3]);

				expect(pAll.isPending()).toBe(true);
				
				p1.resolve();

				expect(pAll.isPending()).toBe(true);

				p2.resolve();

				expect(pAll.isPending()).toBe(true);

				p3.reject(3);

				expect(pAll.isRejected()).toBe(true);
				pAll.fail(function(reasons){
					expect(reasons[0]).toBeUndefined();
					expect(reasons[1]).toBeUndefined();
					expect(reasons[2]).toEqual(3);
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAll = PromiseLite.all([p1, p2, p3]);

				expect(pAll.isPending()).toBe(true);
				
				p1.resolve();

				expect(pAll.isPending()).toBe(true);

				p2.reject(2);

				expect(pAll.isRejected()).toBe(true);
				pAll.fail(function(reasons){
					expect(reasons[0]).toBeUndefined();
					expect(reasons[2]).toBeUndefined();
					expect(reasons[1]).toEqual(2);
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAll = PromiseLite.all([p1, p2, p3]);

				expect(pAll.isPending()).toBe(true);
				
				p1.reject(3);

				expect(pAll.isRejected()).toBe(true);
				pAll.fail(function(reasons){
					expect(reasons[2]).toBeUndefined();
					expect(reasons[1]).toBeUndefined();
					expect(reasons[0]).toEqual(3);
				});
			});
		});

		describe('Promise.race', function(){

			it('should be resolved if the first promise settled is fulfilled', function(){
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p2.resolve(2);

				expect(pRace.isFulfilled()).toBe(true);

				pRace.then(function(values){
					expect(values[0]).toBeUndefined();
					expect(values[1]).toEqual(2);
					expect(values[2]).toBeUndefined;
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p1.resolve(2);

				expect(pRace.isFulfilled()).toBe(true);

				pRace.then(function(values){
					expect(values[2]).toBeUndefined();
					expect(values[0]).toEqual(2);
					expect(values[1]).toBeUndefined;
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p3.resolve(2);

				expect(pRace.isFulfilled()).toBe(true);

				pRace.then(function(values){
					expect(values[0]).toBeUndefined();
					expect(values[2]).toEqual(2);
					expect(values[1]).toBeUndefined;
				});

			});

			it('should be rejected if the first promise settled is rejected', function(){
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p2.reject(2);

				expect(pRace.isRejected()).toBe(true);

				pRace.fail(function(reasons){
					expect(reasons[0]).toBeUndefined();
					expect(reasons[1]).toEqual(2);
					expect(reasons[2]).toBeUndefined;
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p1.reject(2);

				expect(pRace.isRejected()).toBe(true);

				pRace.fail(function(reasons){
					expect(reasons[1]).toBeUndefined();
					expect(reasons[0]).toEqual(2);
					expect(reasons[2]).toBeUndefined;
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pRace = PromiseLite.race([p1, p2, p3]);

				expect(pRace.isPending()).toBe(true);
				
				p3.reject(2);

				expect(pRace.isRejected()).toBe(true);

				pRace.fail(function(reasons){
					expect(reasons[0]).toBeUndefined();
					expect(reasons[2]).toEqual(2);
					expect(reasons[1]).toBeUndefined;
				});

			});
			
		});

		describe('Promise.any', function(){

			it('should be resolved as soon as one promise is resolved', function(){
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAny = PromiseLite.any([p1, p2, p3]);

				expect(pAny.isPending()).toBe(true);
				
				p1.reject();
				expect(pAny.isPending()).toBe(true);

				p2.reject();
				expect(pAny.isPending()).toBe(true);
				
				p3.resolve(2);
				expect(pAny.isFulfilled()).toBe(true);

				pAny.then(function(values){
					expect(values[0]).toBeUndefined();
					expect(values[1]).toBeUndefined();
					expect(values[2]).toEqual(2);
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAny = PromiseLite.any([p1, p2, p3]);

				expect(pAny.isPending()).toBe(true);
				
				p1.reject();
				expect(pAny.isPending()).toBe(true);

				p2.resolve(1);
				expect(pAny.isFulfilled()).toBe(true);
				
				p3.reject();

				pAny.then(function(values){
					expect(values[0]).toBeUndefined();
					expect(values[1]).toEqual(1);
					expect(values[2]).toBeUndefined();
				});

				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAny = PromiseLite.any([p1, p2, p3]);

				expect(pAny.isPending()).toBe(true);
				
				p1.resolve(3);
				expect(pAny.isFulfilled()).toBe(true);
				
				p2.reject();

				pAny.then(function(values){
					expect(values[0]).toEqual(3);
					expect(values[1]).toBeUndefined();
					expect(values[2]).toBeUndefined();
				});

			});

			it('should be rejected if all the promises are rejected', function(){
				
				var p1 = new PromiseLite();
				var p2 = new PromiseLite();
				var p3 = new PromiseLite();

				var pAny = PromiseLite.any([p1, p2, p3]);

				expect(pAny.isPending()).toBe(true);
				
				p1.reject(1);
				p2.reject(2);
				p3.reject(3);

				pAny.fail(function(reasons){
					expect(reasons[0]).toEqual(1);
					expect(reasons[1]).toEqual(2);
					expect(reasons[2]).toEqual(3);
				});

			});
			
		});

		describe('Promise.force', function(){

			it('should be executed when the promise is resolved', function(){
				
				var p1 = new PromiseLite();

				console.log(">>>>>>>>>>>>>>>>>>>>>", p1)
				
				p1.force(function(value){
					expect(value).toEqual(1);
				});

				p1.resolve(1);

			});

			it('should be executed when the promise is rejected', function(){
				
				var p1 = new PromiseLite();
				
				p1.force(function(reason){
					expect(reason).toEqual(1);
				});

				p1.reject(1);

			});

			it('should be executed when a then raises an error', function(){
				
				var p1 = new PromiseLite();
				
				p1.then(function(){
					throw 'testError';
				}).force(function(value){
					expect(value).toEqual('testError');
				});

				p1.resolve();

			});

			it('should be executed when a fail raises an error', function(){
				
				var p1 = new PromiseLite();
				
				p1.then(function(){
					throw 'testError'
				}).fail(function(){
					throw 'anotherError';
				}).then(function(){
					expect(true).toBe(false); // should not enter here
				}).force(function(value){
					expect(value).toEqual('anotherError');
				});

				p1.resolve();

			});

			it('should be executed in chain', function(){
				
				var p1 = new PromiseLite();
				
				p1.force(function(){
					throw 'error1';
				}).fail(function(reason){
					expect(reason).toEqual('error1');
					throw 'error2';
				}).force(function(value){
					expect(value).toEqual('error2');
					throw 'error3';
				}).then(function(value){
					expect(true).toBe(false); // should not enter here
				}).force(function(reason){
					expect(reason).toEqual('error3')
				});

				p1.resolve();

			});
			
		});

		describe('updatable promises', function(){

			it('should be resolved N times, given N in the constructor', function(){
				
				var resolveCount = 0;

				var p1 = new PromiseLite(undefined, 3);
				
				p1.then(function(){
					resolveCount++;
				});

				p1.resolve();
				expect(resolveCount).toEqual(1);
				p1.resolve();
				expect(resolveCount).toEqual(2);
				p1.resolve();
				expect(resolveCount).toEqual(3);
				p1.resolve();
				expect(resolveCount).toEqual(3);

			});
			
		});

	});

});