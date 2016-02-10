/**
 * @ngdoc overview
 * @name logger
 *
 *
 * @description
 * # Logger
 * Logger is the module of Barney that provides you an advanced log system.
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
 * # Components
 * - {@link logger.BarneyLogger BaseLogger} 
 * - {@link logger.BarneyRotatingLogger RotatingLogger} 
 * 
 * # Usage
 * To use **BarneyLogger** remember that you have to point to the external javascript files you need:
 *
 * <pre>
 *	  <!-- logger module -->
 *   <script type="text/javascript" src="./bower_components/barney/dist/logger.min.js">  
 * </pre>
 *
 * # Init Logger
 * Before using Logger module, it must be initialized. 
 * To initialize Logger you can use the Logger method {@link logger.BarneyLogger#methods_init init}.
 *
 */