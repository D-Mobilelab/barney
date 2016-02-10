/**
 * @ngdoc overview
 * @name analytics
 *
 * @description
 * # Analytics
 * Analytics is the module of Barney for Google Analytics.
 * You can use it to:
 *
 * - set user id
 * - set a session/user custom dimension
 * - track a page
 * - track an event
 * 
 * # Usage
 * To use **Analytics** module you have to include the **Analytics** javascript file in your index.html:
 *
 * <pre>
 *
 *	  <!-- Analytics module -->
 *   <script type="text/javascript" src="./bower_components/barney/dist/analytics.min.js"> 
 *
 * </pre>
 * 
 * # Init Analytics
 * Before using Analytics module, it must be initialized. 
 * To initialize Analytics you can use the Analytics method {@link analytics.BarneyAnalytics#methods_init init}.
 *
 * # Methods:
 * 
 * - {@link analytics.BarneyAnalytics#methods_init init}
 * - {@link analytics.BarneyAnalytics#methods_setDimension setDimension}
 * - {@link analytics.BarneyAnalytics#methods_setId setId}
 * - {@link analytics.BarneyAnalytics#methods_trackEvent trackEvent}
 * - {@link analytics.BarneyAnalytics#methods_trackPage trackPage}
 *
 */