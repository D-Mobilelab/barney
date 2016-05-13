if(!barney) { var barney = {}; }
/**
 * @ngdoc object
 * @name promise
 *
 * @description
 * PromiseLite is a light, browser-friendly implementation of JavaScript promises. 
 *
 * # Import
 * ## Vanilla JS
 * Import this single file to use Promise module, in Vanilla JS:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/base/promise.js"> 
 * </pre>
 * Now you can use global object **barney.Promise** and associated methods, described below.
 *
 * ## Angular
 * Import this single file to use Promise module, in Angular framework:
 * <pre>
 * <script type="text/javascript" src="./bower_components/barney/angular/promise.js"> 
 * </pre>
 * Now you can import **barney** module for your Angular app.
 * <pre>
 * angular.module('yourApp', [ 'barney' ]);
 * </pre>
 * Promise module for Angular contains only {@link promise.BarneyPromise BarneyPromise service}.
 *
 * # Usage
 * ## Executors, then and fail
 * See the documentation of JavaScript *Promise* [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * The name *fail* was used instead of *catch* for compatibility reasons. since some browsers do not allow bare keywords in dot notation.
 *
 * <pre>
 * var p = new PromiseLite(function(resolve, reject){
 *     setTimeout(function(){
 *         if (Math.random() > 0.5){
 *             resolve('It worked!');
 *         } else {
 *             reject('It failed!');
 *         }
 *     })
 * }).then(function(value){
 *     console.info('Yay! ' + value); // outputs 'Yay! It worked!'
 * }).fail(function(reason){
 *     console.error('Ops! ' + reason); // outputs 'Ops! It failed!'
 * });
 * </pre>
 *
 * ## Forced blocks
 * 
 * The method *force* corresponds to a *finally* block applied to a chain of promises. It is executed both when a *PromiseLite* instance is both in a fulfilled or rejected state. 
 * 
 * The name *force* was used instead of *finally* for compatibility reasons since some browsers do not allow bare keywords in dot notation.
 *
 * <pre>
 * var p = new PromiseLite();
 *
 * p.then(function(value){
 *    // do something if resolved
 *    // i.e. read data from an open file
 * }).fail(function(reason){
 *    // do something if rejected (or if an Error is raised)
 *    // i.e. show an error message on screen - "missing file"
 * }).force(function(){
 *    // do something both if resolved or rejected
 *    // i.e. close the file
 * });
 * </pre>
 *
 * ## Resolving a Promise created without an executor
 * 
 * <pre>
 * var p = new PromiseLite();
 *
 * p.then(function(value){
 *     console.log('The answer is ' + value);
 * });
 *
 * // since p has no executor, it won't be resolved until we invoke p.resolve
 *
 * p.resolve(42); // outputs 'The answer is 42'
 * </pre>
 */

 barney.Promise = function(){

    var PROMISE_STATUS = {
        0: 'pending',
        1: 'fulfilled',
        2: 'rejected'
    }

    var PASS = function(arg){
        return arg;
    }

    var PrivatePromise = function(executor, nextProm){

        // executor called at the end of the definition of Promise
        if (typeof executor !== 'undefined' && typeof executor !== 'function'){
            throw 'PromiseLite :: executor must be a function, got ' + typeof executor;
        }
        
        var promiseInstance = this;
        var promiseStatusIndex = 0;
        var promiseValue;
        var promiseReason;
        var next = nextProm || [];

        var getValue = function(){
            return promiseValue;
        }

        var getReason = function(){
            return promiseReason;
        }

        /**
        * Returns whether the current PromiseLite instance is in a "pending" state
        * @function isPending
        * @memberof PromiseLite#
        */
        this.isPending = function(){
            return promiseStatusIndex === 0;
        }

        /**
        * Returns whether the current PromiseLite instance is in a "fulfilled" state
        * @function isFulfilled
        * @memberof PromiseLite#
        */
        this.isFulfilled = function(){
            return promiseStatusIndex === 1;
        }

        /**
        * Returns whether the current PromiseLite instance is in a "rejected" state
        * @function isRejected
        * @memberof PromiseLite#
        */
        this.isRejected = function(){
            return promiseStatusIndex === 2;
        }

        /**
        * Returns whether the current PromiseLite instance is in a "settled" state (fulfilled or rejected)
        * @function isSettled
        * @memberof PromiseLite#
        */
        this.isSettled = function(){
            return (promiseStatusIndex === 1) || (promiseStatusIndex === 2);
        }

        /**
        * Returns the state of the current PromiseLite instance as a string
        * @function getStatus
        * @memberof PromiseLite#
        */
        this.getStatus = function(){
            return PROMISE_STATUS[promiseStatusIndex];
        }

        var immediatelyFulfill = function(success, error){

            return new PrivatePromise(function(res, rej){
                try {
                    res(success(getValue()));
                } catch (err){
                    // if we're trying to pass the error to the next node of the chain
                    // but the next node of the chain is undefined
                    // throw error, otherwise pass it forward through the chain
                    if (error == PASS && next.length == 0){
                        throw err;
                    } else {
                        rej(error(err));   
                    }
                }
            }, next);

        }

        var immediatelyReject = function(error){

            return new PrivatePromise(function(res, rej){
                try {
                    rej(error(getReason()));
                } catch (err){
                    if (next.length == 0){
                        throw err;
                    } else {
                        rej(PASS(err));   
                    }
                }
            }, next);
            
        }

        /**
        * Resolves the current PromiseLite instance
        * @function resolve
        * @memberof PromiseLite#
        * @param {any} value to which the current PromiseLite instance is resolved
        */
        this.resolve = function(value){
            if (promiseStatusIndex !== 0){
                return;
            }
            promiseStatusIndex = 1;
            promiseValue = value;

            if (next.length > 0){
                var toDo = next.shift();

                if (toDo.onSuccess === toDo.onError){
                    toDo.onError = PASS;
                }
                return immediatelyFulfill(toDo.onSuccess, toDo.onError);   
            }
        }

        /**
        * Rejects the current PromiseLite instance
        * @function reject
        * @memberof PromiseLite#
        * @param {any} reason the reason of the rejection
        */
        this.reject = function(reason){
            if (promiseStatusIndex === 2){
                return;
            }
            promiseStatusIndex = 2;
            promiseReason = reason;

            if (next.length > 0){
                var toDo = next.shift();
                return immediatelyReject(toDo.onError);
            }
        }

        var addNext = function(onSuccess, onError){

            if (typeof onError === 'undefined'){
                onError = PASS;
            }

            if (typeof onSuccess === 'undefined'){
                onSuccess = PASS;
            }

            next.push({
                onSuccess: onSuccess,
                onError: onError
            });
        }

        /**
        * Adds a then block to the current PromiseLite instance
        * @function then
        * @memberof PromiseLite#
        * @param {function} onSuccess function that will be executed if the PromiseLite is resolved
        * @param {function} onError function that will be executed if the PromiseLite is rejected
        */
        this.then = function(onSuccess, onError){
            if (promiseInstance.isPending()){
                addNext(onSuccess, onError);
                return promiseInstance;
            }

            if (promiseInstance.isFulfilled()){
                return immediatelyFulfill(onSuccess, onError);
            }

            if (promiseInstance.isRejected()){
                return immediatelyReject(onError);
            }
        }

        /**
        * Adds a fail (catch) block to the current PromiseLite instance
        * @function fail
        * @memberof PromiseLite#
        * @param {function} onError function that will be executed if the PromiseLite is rejected
        */
        this.fail = function(onError){
            return promiseInstance.then(undefined, onError);
        }

        /**
        * Adds a force (finally) block to the current PromiseLite instance
        * @function force
        * @memberof PromiseLite#
        * @param {function} callback function that will be executed both if the PromiseLite is resolved or rejected
        */
        this.force = function(callback){
            return promiseInstance.then(callback, callback);
        }

        if (typeof executor === 'function'){
            executor(promiseInstance.resolve, promiseInstance.reject);
        }

    }

    /**
    * PromiseLite public constructor
    * @class PromiseLite
    */
    var PublicPromise = function(executor){
        return new PrivatePromise(executor);
    }

    /**
     * @ngdoc function
     * @name promise#all
     * @methodOf promise
     *
     * @description *PromiseLite.all* takes an *Array* of *PromiseLite* as argument and is resolved if and only if all such promises are fulfilled.
     *
     * @param {Array} promiseList a list of PromiseLite instances
     *
     * @example
     * <pre>
     * var p1 = new PromiseLite();
     * var p2 = new PromiseLite();
     * var p3 = new PromiseLite();
     * var pAll = new PromiseLite.all([p1, p2, p3]);
     * </pre>
     */
    PublicPromise.all = function(promiseList){
        var promiseAll = new PublicPromise();
        var promiseCount = promiseList.length;

        var results = new Array(promiseCount);
        var reasons = new Array(promiseCount);
        var fulfilled = new Array(promiseCount);

        var checkAllFulfilled = function(){
            var counted = 0;
            for (var key in fulfilled){
                counted++;
                if (!fulfilled[key]){
                    promiseAll.reject(reasons);
                    return;
                }
            }

            if (counted == promiseCount){
                promiseAll.resolve(results);
            }
        }
        
        var promise;
        
        for (var i=0; i<promiseList.length; i++){
            promise = promiseList[i];
            
            (function(num, prom){
                prom.then(function(value){
                    fulfilled[num] = true;
                    results[num] = value;
                    checkAllFulfilled();
                }).fail(function(reason){
                    fulfilled[num] = false;
                    reasons[num] = reason;
                    checkAllFulfilled();
                });
            })(i, promise);
        }

        return promiseAll;
    }

    /**
     * @ngdoc function
     * @name promise#race
     * @methodOf promise
     *
     * @description
     * *PromiseLite.race* takes an Array of *PromiseLite* as argument, then
     * * if the first promise that is settled is fulfilled, the promise returned by *PromiseLite.race* is resolved
     * * if the first promise that is settled is rejected, the promise returned by *PromiseLite.race* is rejected
     *
     * @param {Array} promiseList a list of PromiseLite instances
     *
     * @example
     * <pre>
     * var p1 = new PromiseLite();
     * var p2 = new PromiseLite();
     * var p3 = new PromiseLite();
     * var pAll = new PromiseLite.race([p1, p2, p3]);
     * </pre>
     */
    PublicPromise.race = function(promiseList){
        var promiseRace = new PublicPromise();
        var promiseCount = promiseList.length;
        var results = new Array(promiseCount);
        var reasons = new Array(promiseCount);
        
        var promise;
        for (var i=0; i<promiseList.length; i++){
            promise = promiseList[i];
            
            (function(num, prom){
                prom.then(function(value){
                    results[num] = value;
                    promiseRace.resolve(results);
                }).fail(function(reason){
                    reasons[num] = reason;
                    promiseRace.reject(reasons);
                });
            })(i, promise);
        }

        return promiseRace;
    }

    /**
     * @ngdoc function
     * @name promise#any
     * @methodOf promise
     *
     * @description
     * *PromiseLite.any* takes an Array of *PromiseLite* as argument, then
     * * if at least one of such promises is fulfilled, the promise returned by *PromiseLite.any* is resolved
     * * if all the promises are rejected, the promise returned by *PromiseLite.any* is rejected
     *
     * @param {Array} promiseList a list of PromiseLite instances
     *
     * @example
     * <pre>
     * var p1 = new PromiseLite();
     * var p2 = new PromiseLite();
     * var p3 = new PromiseLite();
     * var pAll = new PromiseLite.any([p1, p2, p3]);
     * </pre>
     */
    PublicPromise.any = function(promiseList){
        var promiseAny = new PublicPromise();
        var promiseCount = promiseList.length;

        var rejected = new Array(promiseCount);
        var reasons = new Array(promiseCount);
        var values = new Array(promiseCount);

        var allRejected = function(){
            for (var j=0; j<promiseCount; j++){
                if (!rejected[j]){
                    return false;
                }
            }
            return true;
        }

        var promise;
        for (var i=0; i<promiseList.length; i++){
            promise = promiseList[i];
            
            (function(num, prom){
                prom.then(function(value){
                    values[num] = value;
                    promiseAny.resolve(values);
                }).fail(function(reason){
                    rejected[num] = true;
                    reasons[num] = reason;

                    if (allRejected()){
                        promiseAny.reject(reasons);
                    }
                });
            })(i, promise);
        }

        return promiseAny;
    }

    return PublicPromise;

}