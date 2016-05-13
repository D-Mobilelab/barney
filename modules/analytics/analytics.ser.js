/**
 * @ngdoc object
 * @name analytics.BarneyAnalytics
 *
 * @description 
 * Angular service of {@link analytics Analytics} module
 *
 * # Import & Usage
 * To use Analytics service, you have to add BarneyAnalytics 
 * dependency to your component (directive, controller...).
 * <pre>
 * angular.module('mock').controller('HomePageController', [
 *     'BarneyAnalytics',
 *     function(BarneyAnalytics){
 *         // we can use "BarneyAnalytics" object here
 *     }
 * ]);
 * </pre>
 */

angular.module('barney').factory('BarneyAnalytics', [
    function(){

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#init
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Refer to {@link analytics#methods_init init} method of Analytics module, replacing *barney.analytics* to *BarneyAnalytics*
         */
        this.init = function(options) {
            barney.Analytics.init(options);
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#setId
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Refer to {@link analytics#methods_setId setId} method of Analytics module, replacing *barney.analytics* to *BarneyAnalytics*
         */
        this.setId = function(id){
            barney.Analytics.setId(id);
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#setDimension
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Refer to {@link analytics#methods_setDimension setDimension} method of Analytics module, replacing *barney.analytics* to *BarneyAnalytics*
         */
        this.setDimension = function(dimensions){
            barney.Analytics.setDimension(dimensions);
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#trackPage
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Refer to {@link analytics#methods_trackPage trackPage} method of Analytics module, replacing *barney.analytics* to *BarneyAnalytics*
         */
        this.trackPage = function(options){
            barney.Analytics.trackPage(options);
        };

        /**
         * @ngdoc function
         * @name analytics.BarneyAnalytics#trackEvent
         * @methodOf analytics.BarneyAnalytics
         *
         * @description Refer to {@link analytics#methods_trackEvent trackEvent} method of Analytics module, replacing *barney.analytics* to *BarneyAnalytics*
         */
        this.trackEvent = function(options){
            barney.Analytics.trackEvent(options);
        };

        return this;
    }
]);