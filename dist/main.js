(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["barneyjs"] = factory();
	else
		root["barneyjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// modules
	import angular from 'angular';

	// browser
	import BarneyBrowser from './browser/browser.ser';

	// config
	import BarneyConfig from './config/config.pro';
	import config from './config/config.fil';

	// dict
	import BarneyDict from './dict/dict.pro';
	import dictDir from './dict/dict.dir';
	import dictFil from './dict/dict.fil';

	// infinite
	import infiniteScroll from './infinite/infinite-scroll.dir';

	// livehtml
	import liveHtml from './livehtml/live-html.dir';
	import script from './livehtml/script.dir';

	// meta
	import BarneyMeta from './meta/meta.ser';

	const appName = 'barney';

	angular.module(appName)
	    // browser
	    .factory('BarneyBrowser', BarneyBrowser)

	    // config
	    .provider('BarneyConfig', BarneyConfig)
	    .filter('config', config)

	    // dict
	    .provider('BarneyDict', BarneyDict)
	    .directive('dict', dictDir)
	    .filter('dict', dictFil)

	    // infinite
	    .directive('infiniteScroll', infiniteScroll)

	    // livehtml
	    .directive('liveHtml', liveHtml)
	    .directive('script', script)

	    // meta
	    .factory('meta', BarneyMeta)
	;


/***/ })
/******/ ])
});
;

/* barneyjs 6.0.0-0 */