'use strict';
/**
 * 
 * Barney Newton tracking module.directive
 * this directive track event on Newton on click event in any element
 * 
 * @project		Barney
 * @encoding UTF-8
 * @author		Giorgio Tonelli <g.tonelli@aimconsulting.it>
 * @creation 19/06/2015
 * 
 * use:
 * You can use this directive by simply adding newton-track attribute
 * 
 * by default action is that specified on defaultAction variable
 * to customise action set newton-track attribute in this manner : newton-track="mycustomaction"
 * 
 * you can send tracking properties in this way
 * newton-properties="{keyone:'first one', keytwo:'second one'}"
 * 
 * 
 * examples
 * with ng-click:
 * <button newton-track="some action" newton-properties="{one:'first one', two:'second one'}"  type="button" ng-click="chiliSpicy()">Change</button>
 * app internal link
 * <a href="/somelink" newton-track="some action">go</a>
 * external link
 * <a href="http://google.it" newton-track="some action"  ; newton-properties="{one:'first one', two:'second one'}"  >track me before go</a>
 * 
 */
angular.module('barney.newtontrack').directive('newtonTrack', 
	['BarneyNewtontrack','$timeout', 
	function(NewtonTrack,$timeout) {
		
		var defaultAction = 'trackLink'; // default action
		var externalLinkTimeout = 1000;// timeout for external link
		

		return { 
			restrict: 'A',
			scope:{
				'newtonProperties' : '@',
				'newtonTrack' : '@',
				'href' : '@',
			},
			link: function($scope, element, attrs) {
				// check is link and is external
				var isExternal = function(){
					if($scope.href){//do catch here
						if(($scope.href.match('^https?') && !$scope.href.match('#!?/')) || ($scope.rel && $scope.rel=='external')){// is absolute url and not internal link
							return true;
						}
					}
					return false;
				}
				
				element.bind('click', function(event) {
					// if is an external link
					// we set a timeout before   browser  release
					if(isExternal()){
						event.preventDefault();
						$timeout(function(){
							window.location.href= $scope.href;
						},externalLinkTimeout);
					}
					
					NewtonTrack.trackEvent({
						action: ($scope.newtonTrack) ? $scope.newtonTrack : defaultAction,
						properties : ($scope.newtonProperties) ? $scope.$eval($scope.newtonProperties) : {}
					});
				});
			}
		};
}]); 