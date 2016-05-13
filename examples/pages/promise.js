'use strict';

angular.module('example').controller('PromiseCtrl', [
    '$scope', 'BarneyPromise',
	function($scope, BarneyPromise){

		// THEN, FAIL, FORCE

		var p1 = BarneyPromise(function(resolve, reject){
		    setTimeout(function(){
		        if (Math.random() > 0.5){
		            resolve('P1 worked!');
		        } else {
		            reject('P1 failed!');
		        }
		    });
		}).then(function(value){
		        console.info('Yay! ' + value); // outputs 'Yay! P1 worked!'
		}).fail(function(reason){
		        console.error('Ops! ' + reason); // outputs 'Ops! P1 failed!'
		});
		p1.force(function(){
		    console.info('P1 However... '); // outputs 'However...'
		});

		// RESOLVE OUT OF METHOD

		var p2 = BarneyPromise().then(function(value){
		    console.info('Yay! ' + value); // outputs 'Yay! P2 worked!'
		}).fail(function(reason){
		    console.error('Ops! ' + reason); // outputs 'Ops! P2 failed!'
		});
		setTimeout(function(){
	        if (Math.random() > 0.5){
	            p2.resolve('P2 worked!');
	        } else {
	            p2.reject('P2 failed!');
	        }
	    });

	    // ALL

	    var p4 = BarneyPromise();
		var p5 = BarneyPromise();
		BarneyPromise.all([p4, p5]).then(function(array){
			console.log(array);
		});
		setTimeout(function(){
			p4.resolve(4);
		}, 1000);
		setTimeout(function(){
			p5.resolve(5);
		}, 1200);

		// ANY

	    var p6 = BarneyPromise();
		var p7 = BarneyPromise();
		BarneyPromise.any([p6, p7]).then(function(array){
			console.log(array);
		});
		setTimeout(function(){
			p6.reject(6);
		}, 1000);
		setTimeout(function(){
			p7.resolve(7);
		}, 1200);

		// RACE

	    var p8 = BarneyPromise();
		var p9 = BarneyPromise();
		BarneyPromise.race([p8, p9]).then(function(array){
			console.log(array);
		}).fail(function(array){
			console.warn(array);
		});
		setTimeout(function(){
			p8.reject(8);
		}, 1000);
		setTimeout(function(){
			p9.resolve(9);
		}, 1200);
		
	}
]);
