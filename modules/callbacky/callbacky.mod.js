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
 * Remember to include the external javascript files you need:
 *
 * <pre>
 *
 *	  <!-- Callbacky module -->
 *   <script type="text/javascript" src="./bower_components/barney/callbacky/callbacky.mod.js"> 
 *
 *	  <!-- Callbacky service -->
 *   <script type="text/javascript" src="./bower_components/barney/callbacky/callbacky.pro.js"> 
 *
 * </pre>
 * 
 * # Init Callbacky
 * Before using Callbacky module, it must be initialized. 
 * To initialize Callbacky you can use the Callbacky method {@link callbacky.BarneyCallbacky#methods_init init}.
 */