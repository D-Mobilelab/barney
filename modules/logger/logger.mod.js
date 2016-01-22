/**
 * @ngdoc overview
 * @name logger
 *
 *
 * @description
 * Logger is the module of Barney that provides you an advanced log system.
 *
 * You can use it as **default** logger or as a **rotating** logger (see the 
 * documentation of the service you want to use).
 * 
 * To use **BarneyLogger** remember that you have to point to the external javascript files you need:
 *
 * ***Base Logger is required to use both the services.***
 * <pre>
 *
 *	  <!-- Base  Logger - REQUIRED -->
 *   <script type="text/javascript" src="../logger/logger.van.js"> 
 *
 *	  <!-- Rotating Logger -->
 * 	 <script type="text/javascript" src="../logger/rotating-log.van.js"> 
 *
 *	  <!-- logger module -->
 *   <script type="text/javascript" src="../logger/logger.mod.js"> 
 *
 *	  <!-- Base logger service -->
 *   <script type="text/javascript" src="../logger/logger.ser.js">
 *
 *	  <!-- Rotating Logger service -->
 *   <script type="text/javascript" src="../logger/rotating-logger.ser.js"> 
 * </pre>
 *
 *
 * Remember that **Logger** is organized in **levels**, sorted by relevance: 
 *
 * - **Log**;
 * - **Info**;
 * - **Table**;
 * - **Warning**;
 * - **Error**;
 *
 * ***Note that is very relevant of how Logger's levels are ordered!***
 *
 * # Import module
 * To import **Logger** module, include **barney.logger** to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.logger'
 * ])
 * </pre>
 *
 * # Init Logger
 * Before using Logger module, it must be initialized. 
 * To initialize Logger you can use the Logger method {@link logger.BarneyLogger#methods_init init}.
 */
angular.module('barney.logger', []);