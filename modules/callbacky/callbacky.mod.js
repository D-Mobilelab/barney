/**
 * @ngdoc overview
 * @name callbacky
 *
 *
 * @description
 * Callbacky is the module of Barney that allow you 
 * to bind and trigger a function from different points in your code (i.e: controllers, services, ...).
 * 
 * # Import module
 * To import Callbacky module, include barney.callbacky to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.callbacky'
 * ])
 * </pre>
 * 
 * # Init Callbacky
 * Before using Callbacky module, it must be initialized. 
 * To initialize Callbacky you can use the Callbacky method {@link callbacky.BarneyCallbacky#methods_init init}.
 */
angular.module('barney.callbacky', []);