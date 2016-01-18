/**
 * @ngdoc overview
 * @name barney.config
 *
 * @description
 * Config is the Barney module used to get variables or specific environment settings. It read a JSON object where all environment variables and settings are stored.
 * 
 * # Import module
 * To import Config module, include barney.config module to your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.config'
 * ])
 * </pre>
 *
 * # Init Config
 * In order to allow a pretty response from the config module if a variable doesn't exist, you can set this by passing an object to the init method including the notExistValue param. The allowed values are null, false, 0 or a string.
 *  {@link barney.config.BarneyConfig#methods_init init}. 
 * 
 * # Config Values
 * Here is an example of Config object: 
 * <pre>
 * 	var CONFIG = {
 * 		'ENABLE_LOGIN': 1,
 * 		'NEWTON_SECRET_KEY': '<sec_ret>',
 * 		'KEY_TRUE': true,
 * 		'KEY_VOID_STRING': '',
 * 		'KEY_ZERO': 0,
 * 		'KEY_ZERO_STRING': '0',
 * 		'KEY_NULL': null,
 * 		'KEY_NULL_STRING': 'null',
 * 		'KEY_FALSE': false,
 * 		'KEY_FALSE_STRING': 'false'
 * 	}
 * </pre>
 */
angular.module('barney.config', []);