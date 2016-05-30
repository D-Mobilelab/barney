/**
 * @ngdoc overview
 * @name welcome
 *
 * @description
 * # Welcome to Barney!
 * Barney is a set of Angular libraries, useful for various purposes.
 *
 * Barney is divided in various modules, every module performs an action and is indipendent.
 *
 * To discover the purpose of every module and read instruction to include and use it, open related page:
 * - {@link config config}
 * - {@link dict dict}
 * - {@link history history}
 * - {@link infinite infinite}
 * - {@link livehtml livehtml}
 * - {@link meta meta}
 * - {@link utility utility}
 */

/**
 * @ngdoc overview
 * @name config
 *
 * @description
 * # Config
 * Config is the Barney module used to get environment variables. 
 *
 * It reads a JSON object where all environment variables are stored.
 * 
 * ## Usage
 * To use **Config** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/dist/config.min.js">
 * </pre>
 * and include **barney** module to your Angular app:
 * <pre>
 *	angular.module('yourAngularApp', [
 *   ...,
 *   'barney',
 *   ...
 * ])
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link config.BarneyConfig service}
 * - {@link config.filter:config filter}
 */ 

/**
 * @ngdoc overview
 * @name dict
 *
 * @description
 * # Dict
 * Dict is the module of Barney to show dictionary keys.
 * 
 * ## Usage
 * To use **Dict** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/dist/dict.min.js">
 * </pre>
 * and include **barney** module to your Angular app:
 * <pre>
 *	angular.module('yourAngularApp', [
 *   ...,
 *   'barney',
 *   ...
 * ])
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link dict.BarneyDict service}
 * - {@link dict.filter:dict filter}
 * - {@link dict.directive:dict directive}
 */ 