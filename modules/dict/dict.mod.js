/**
 * @ngdoc overview
 * @name barney.dict
 *
 * @description
 * Dict is the module of Barney to show dictionary keys.
 * You can use it:
 *
 * - as a provider
 * - as a filter
 * - as a directive
 * 
 * # Import module
 * To import dict module, include barney.dict module to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.dict'
 * ])
 * </pre>
 */
angular.module('barney.dict', [])
.constant('DictObj', DICTIONARY);