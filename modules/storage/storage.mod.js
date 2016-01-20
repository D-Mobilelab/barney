/**
 * @ngdoc overview
 * @name storage
 *
 * @description
 * Storage is the module of Barney used to set and get values from 3 different storage:
 *
 * - Local Storage;
 * - Cookies;
 * - jsObject.
 *
 * # Import module
 * To import Storage module, include barney.storage to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.storage'
 * ])
 * </pre>
 * 
 * # Init Storage
 * Before using Storage module, it must be initialized. 
 * To initialize Storage you can use the Storage method {@link storage.BarneyStorage#methods_init init}.
 */
angular.module('barney.storage', ['barney.storage.subset']);