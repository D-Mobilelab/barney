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
 * Remember, before using a Barney module, to include **barney** to your Angular app:
 * <pre>
 *	angular.module('yourAngularApp', [
 *   ...,
 *   'barney',
 *   ...
 * ])
 * </pre>
 *
 * To discover the purpose of every module and to read the instruction to include and use it, open the related page:
 * - {@link browser browser}
 * - {@link config config}
 * - {@link dict dict}
 * - {@link infinite infinite}
 * - {@link livehtml livehtml}
 * - {@link meta meta}
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
 * 
 * ## Components
 * You can use now the following components:
 * - {@link config.BarneyConfig provider}
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
 * 
 * ## Components
 * You can use now the following components:
 * - {@link dict.BarneyDict provider}
 * - {@link dict.filter:dict filter}
 * - {@link dict.directive:dict directive}
 */ 

/**
 * @ngdoc overview
 * @name browser
 *
 * @description
 * # Browser
 * Browser is the module of Barney to manage browser.
 * 
 * ## Usage
 * To use **Browser** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/browser/browser.min.js">
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link browser.BarneyBrowser service}
 */ 

/**
 * @ngdoc overview
 * @name infinite
 *
 * @description
 * # Infinite
 * Infinite is the module of Barney to use infinite scroll feature.
 * 
 * ## Usage
 * To use **Infinite** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/infinite/infinite.min.js">
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link infinite.directive:infinite directive}
 */ 

/**
 * @ngdoc overview
 * @name livehtml
 *
 * @description
 * # Livehtml
 * Livehtml is the module of Barney to print html code to template, without pre-controls.
 * 
 * ## Usage
 * To use **Livehtml** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/livehtml/livehtml.min.js">
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link livehtml.directive:livehtml directive}
 */ 

 /**
 * @ngdoc overview
 * @name meta
 *
 * @description
 * # Meta
 * Meta is the module of Barney to fill meta tags dinamically.
 *
 * Meta can be used to manage different metatags for each page.
 * 
 * ## Usage
 * To use **Meta** module you have to include the following file:
 * <pre>
 *  <script type="text/javascript" src="./bower_components/barney/meta/meta.min.js">
 * </pre>
 * 
 * ## Components
 * You can use now the following components:
 * - {@link meta.BarneyMeta service}
 */