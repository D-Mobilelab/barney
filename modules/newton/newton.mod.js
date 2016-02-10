/**
 * @ngdoc overview
 * @name newton
 *
 *
 * @description
 * Newton is the module of Barney that allows you to track events and pages with Newton library
 *
 * # Import module
 * To import Newton module, include barney.newton to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.newton'
 * ])
 * </pre>
 * 
  * Remember to include the external javascript files you need:
 *
 * <pre>
 *
 *	  <!-- Newton module -->
 *   <script type="text/javascript" src="./bower_components/barney/newton/newton.mod.js"> 
 *
 *	  <!-- Newton service -->
 *   <script type="text/javascript" src="./bower_components/barney/newton/newton.ser.js"> 
 *
 * </pre>
 *
 * # Init Newton
 * Before using Newton module, it must be initialized. 
 * To initialize Newton you can use the Newton method {@link newton.BarneyNewton#methods_init init}.
 */