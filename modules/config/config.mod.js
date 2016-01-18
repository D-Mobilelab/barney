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
 * # Init module
 * In order to use Config module you have to define an object with free keys and pass it 
 * to the {@link barney.config.BarneyConfig#methods_init init} method.
 *  
 *  @example
 *  Here is an example of how the Config object must be: 
 *  <pre>
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
 * 		'KEY_FALSE_STRING': 'false',
 * 		...
 * 	}
 *  </pre>
 */
angular.module('barney.config', []);