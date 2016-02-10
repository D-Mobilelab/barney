/**
 * @ngdoc overview
 * @name logger
 *
 *
 * @description
 * # Logger
 * Logger is the module of Barney that provides you an advanced log system.
 *
 * You can use it as {@link logger.BarneyLogger **default**} logger or as a {@link logger.BarneyRotatingLogger **rotating**} logger (see the 
 * documentation of the service you want to use).
 * 
 * To use **BarneyLogger** remember that you have to point to the external javascript files you need:
 *
 * <pre>
 *	  <!-- Infinite module -->
 *   <script type="text/javascript" src="./bower_components/barney/dist/logger.min.js">  
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
 * # Init Logger
 * Before using Logger module, it must be initialized. 
 * To initialize Logger you can use the Logger method {@link logger.BarneyLogger#methods_init init}.
 *
 * 
 * # BaseLogger Methods
 *
 *	- {@link logger.BarneyLogger#methods_error error}.
 *	- {@link logger.BarneyLogger#methods_getConfig getConfig}.
 *	- {@link logger.BarneyLogger#methods_info info}.
 *	- {@link logger.BarneyLogger#methods_init init}.
 *	- {@link logger.BarneyLogger#methods_isEnabled isEnabled}.
 *	- {@link logger.BarneyLogger#methods_log log}.
 *	- {@link logger.BarneyLogger#methods_table table}.
 *	- {@link logger.BarneyLogger#methods_warn warn}.
 *
  * # RotatingLogger Methods
 *
 *	- {@link logger.BarneyRotatingLogger#methods_endRecording endRecording}.
 *	- {@link logger.BarneyRotatingLogger#methods_error error}.
 *	- {@link logger.BarneyRotatingLogger#methods_getConfig getConfig}.
 *	- {@link logger.BarneyRotatingLogger#methods_info info}.
 *	- {@link logger.BarneyRotatingLogger#methods_init init}.
 *	- {@link logger.BarneyRotatingLogger#methods_isEnabled isEnabled}.
 *	- {@link logger.BarneyRotatingLogger#methods_log log}.
 *	- {@link logger.BarneyRotatingLogger#methods_startRecording startRecording}.
 *	- {@link logger.BarneyRotatingLogger#methods_table table}.
 *	- {@link logger.BarneyRotatingLogger#methods_warn warn}.
 *
 */