/**
 * @ngdoc overview
 * @name dict
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
 * 
 * # Init Dict
 * Before using Dict module, it must be initialized.To initialize Dict module use Dict' s method {@link dict.BarneyDict#methods_init init}. 
 */
angular.module('barney.dict', [])
.constant('DictObj', DICTIONARY);