/**
 * @ngdoc overview
 * @name infinite
 *
 *
 * @description
 * **BarneyInfinite** is the module of Barney that provides you the infinite scroll.
 *
 * **BarneyInfinite** listens when a page is scrolled and 
 * knows when you have reached the bottom of the page.
 * When you are at the bottom of the page it calls the given function. 
 * 
 * Remember that you don't need to call the given function in your controller
 * because it will take care **BarneyInfinite**.
 * 
 * **BarneyInfinite** will disable itself after the call of the given function to not 
 * listen other scroll while the call is processing.
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