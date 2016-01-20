/**
 * @ngdoc overview
 * @name analytics
 *
 * @description
 * Analytics is the module of Barney for Google Analytics.
 * You can use it to:
 *
 * - set user id
 * - set a session/user custom dimension
 * - track a page
 * - track an event
 * 
 * # Import module
 * To import analytics module, include barney.analytics module to 
 * your web application module (usually in app.js file)
 * <pre>
 * angular.module('yourApplicationModule', [
 *     'barney.analytics'
 * ])
 * </pre>
 * 
 * # Init Analytics
 * Before using Analytics module, it must be initialized. 
 * To initialize Analytics you can use the Analytics method {@link analytics.BarneyAnalytics#methods_init init}.
 */
 angular.module('barney.analytics', []);