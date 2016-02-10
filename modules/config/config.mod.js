/**
 * @ngdoc overview
 * @name config
 *
 * @description
 * # Config
 * Config is the Barney module used to get environment variables. 
 * It reads a JSON object where all environment variables are stored.
 * 
 * # Components
 *
 * - {@link config.BarneyConfig BarneyConfig}
 * - {@link config.filter:config filter}
 * 
 * # Usage
 * To use **Config** module you have to include the **Config** javascript file in your index.html:
 *
 * <pre>
 *
 *	  <!-- Config module  -->
 *   <script type="text/javascript" src="./bower_components/barney/dist/config.min.js"> 
 *
 * </pre>
 *
 *
 * # Init module
 * In order to use Config module you have to use {@link config.BarneyConfig#methods_init init} method.
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
 *
 */