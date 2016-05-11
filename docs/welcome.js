/**
 * @ngdoc overview
 * @name welcome
 *
 * @description
 * # Welcome to Barney!
 * To use Barney library first of all you have to include **main.min.js** in your index.html file.
 * You can find this file in the **dist** folder of Barney.
 *
 * **index.html**:
 *
 * <pre>
 *  //Include Barney script
 *  <script type="text/javascript" src="./bower_components/barney/dist/main.min.js"> 
 * </pre>
 *
 * Once you have included Barney in to your index.html file remember that you have to import Barney module
 * as a dependency in your **app.js** file.
 *
 * **app.js**:
 * <pre>
 *	angular
 * .module('yourAngularApp', [
 *   ...,
 *   'barney',
 *   ...
 * ])
 * </pre>
 *
 * # Barney Components:
 * Here you can find a full list of the components of Barney: 
 * - {@link analytics analytics}
 * - {@link callbacky callbacky}
 * - {@link config config}
 * - {@link dict dict}
 * - {@link history history}
 * - {@link infinite infinite}
 * - {@link logger logger}
 * - {@link meta meta}
 * - {@link newton newton}
 * - {@link storage storage}
 * - {@link utility utility}
 *
 */