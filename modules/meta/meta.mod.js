/**
 * @ngdoc overview
 * @name barney.meta
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
 * # Init meta
 *
 * Before using meta module, it must be initialized.
 * It's recommended to inizialize it in the app module run.
 * To inizialize it, you have to:
 * 
 * - include BarneyMeta component in your run method
 * - use {@link barney.meta.BarneyMeta#methods_init init} method and pass it an object with free keys.
 *
 * The object will contain standard keys that you will use in your product.
 *
 * @example
 * <pre>
 * angular.module('mock').run(['BarneyMeta',
 *   function(Meta){
 *        
 *       Meta.init({
 *           title: 'Standard title',
 *           description: 'Standard description',
 *           image: 'standard-image.jpg'
 *       });
 * 
 *   }
 * ]);
 * </pre>
 *
 */
angular.module('barney.meta', []);