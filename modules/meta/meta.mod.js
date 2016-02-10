/**
 * @ngdoc overview
 * @name meta
 *
 * @description
 * Meta is the module of Barney to fill meta tags dinamically.
 * Meta can be used to manage different metatags for each page.
 * 
 * # Import module
 * To import meta module, include barney.meta module to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.meta'
 * ])
 * </pre>
 *
 * Remember to include the external javascript files you need:
 *
 * <pre>
 *
 *	  <!-- Meta module -->
 *   <script type="text/javascript" src="./bower_components/barney/meta/meta.mod.js"> 
 *
 *	  <!-- Meta service -->
 *   <script type="text/javascript" src="./bower_components/barney/meta/meta.ser.js"> 
 *
 * </pre>
 *
 * # Init meta
 *
 * Before using meta module, it must be initialized. 
 * To initialize meta you can use the meta method {@link meta.BarneyMeta#methods_init init}.
 */