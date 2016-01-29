/**
 * @ngdoc overview
 * @name infinite
 *
 *
 * @description
 * **BarneyInfinite** is the module of Barney that provides you the infinite scroll.
 *
 * **BarneyInfinite** listens when a page is scrolled and 
 * calculates the window bottom height and the height of the 
 * document. 
 * When the windowBottom is greater than the 
 * document's height it calls the given function. 
 * 
 * Remember that you don't need to call the given function the first time,
 * just pass to the directive a true boolean value.
 * 
 * **BarneyInfinite** will disable itself before the call of the given function.
 * To reenable **BarneyInfinite** you have to pass, to the given function, a new function
 * that you can call inside to reactivate **BarneyInfinite** when you need.
 * See the example to the directive documentation.
 *
 * Don' t worry if your contents doesn't fill the page because infinte scroll
 * will fill the page for you, if there will be enough contents!
 * 
 * If you want to activate **BarneyInfinite** before the reaching of the end of the window you 
 * can use the offset attribute to tell **BarneyInfinite** how much before it must activate 
 * itself.
 *
 * # Import module
 * To import **BarneyInfinite** Scroll module, include barney.**BarneyInfinite** to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.infinite'
 * ])
 * </pre>
 * 
 * Remember to include the external javascript files you need:
 *
 * <pre>
 *
 *	  <!-- Infinite module -->
 *   <script type="text/javascript" src="./bower_components/barney/infinite/infinite.mod.js"> 
 *
 *	  <!-- Infinite directive -->
 *   <script type="text/javascript" src="./bower_components/barney/infinite/infinite-scroll.dir.js"> 
 *
 * </pre>
 *
 */
angular.module('barney.infinite', []);