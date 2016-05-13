/**
 * @ngdoc object
 * @name promise.BarneyPromise
 *
 * @description 
 * Angular service of {@link promise Promise} module.
 *
 * # Import & Usage
 * To use Promise service, you have to add BarneyPromise 
 * dependency to your component (directive, controller...).
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyPromise',
 *     function(BarneyPromise){
 *         // we can use "BarneyPromise" object here
 *     }
 * ]);
 * </pre>
 */

angular.module('barney').factory('BarneyPromise', function(){

	/**
     * @ngdoc function
     * @name promise.BarneyPromise#all
     * @methodOf promise.BarneyPromise
     *
     * @description Refer to {@link promise#methods_all all} method of Promise module, replacing *barney.Promise* to *BarneyPromise*.
     */

    /**
     * @ngdoc function
     * @name promise.BarneyPromise#race
     * @methodOf promise.BarneyPromise
     *
     * @description Refer to {@link promise#methods_race race} method of Promise module, replacing *barney.Promise* to *BarneyPromise*.
     */

    /**
     * @ngdoc function
     * @name promise.BarneyPromise#any
     * @methodOf promise.BarneyPromise
     *
     * @description Refer to {@link promise#methods_any any} method of Promise module, replacing *barney.Promise* to *BarneyPromise*.
     */

    return new barney.Promise();

});