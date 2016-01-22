/**
 * @ngdoc overview
 * @name history
 *
 *
 * @description
 * History is the module of Barney that provide you some methods about browser history.
 *
 * # Import module
 * To import History module, include barney.history to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.history'
 * ])
 * </pre>
 * 
 * Remember to include the external javascript files you need:
 *
 * <pre>
 *
 *	  <!-- History module -->
 *   <script type="text/javascript" src="./bower_components/barney/history/history.mod.js"> 
 *
 *	  <!-- History service -->
 *   <script type="text/javascript" src="./bower_components/barney/history/history.ser.js"> 
 *
 * </pre>
 *
 * # Init History
 * Before using History module, it must be initialized. 
 * To initialize History you can use the History method {@link history.BarneyHistory#methods_init init}.
 */
angular.module('barney.history', []);