'use strict';

angular.module('barney.meta').factory('BarneyMeta',
	['$rootScope',
	function ($rootScope) {

	this.currentMeta = {};
	this.defaultMeta = {};

	this.init = function(metatags){
		for(var key in metatags){
			this.defaultMeta[key] = metatags[key];
			this.currentMeta[key] = metatags[key];
		}
	}

	this.get = function(key){
		console.log(key, this.currentMeta[key]);
		if(!!this.currentMeta[key]){
			return this.currentMeta[key];
		} else {
			return '';
		}
	}

	this.set = function(metatags){
		for(var key in metatags){
			this.currentMeta[key] = metatags[key];
		}
	}

	this.list = function(){
		return this.currentMeta;
	}

	this.defaults = function(){
		return this.defaultMeta;
	}

	this.revert = function(){
		for(var key in this.defaultMeta){
			this.currentMeta[key] = this.defaultMeta[key];
		}
	}

	return this;

}]);
