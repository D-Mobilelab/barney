/**
 * @ngdoc overview
 * @name barney.logger
 *
 *
 * @description
 * Logger is the module of Barney that provides you an advanced log system.
 * You can use it as **default** logger or as a **rotating** logger (see the 
 * documentation of the service you want to use one or the other).
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
 * To initialize Logger you can use the Logger method {@link barney.logger.BarneyLogger#methods_init init}.
 */
angular.module('barney.logger', []);