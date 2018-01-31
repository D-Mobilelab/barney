(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('angular')) :
    typeof define === 'function' && define.amd ? define(['angular'], factory) :
    (global.barneyjs = factory(global.angular));
}(this, (function (angular) { 'use strict';

angular = 'default' in angular ? angular['default'] : angular;

var BarneyBrowser = (function ($location, $rootScope, $window) {
    var previousPath = null;
    var previousState = null;

    var setPrevPath = function setPrevPath(path) {
        previousPath = path;
    };

    var setPrevState = function setPrevState(state) {
        previousState = state;
    };

    var service = {
        init: function init() {
            $rootScope.$on('$locationChangeSuccess', function (event, newurl, oldurl) {
                if (newurl !== oldurl) {
                    setPrevPath(oldurl.substr(oldurl.indexOf('#!') + 2));
                }
            });
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                if (!!previous && !!previous.$$route) {
                    setPrevState(previous.$$route);
                }
            });
        },

        getPrevPath: function getPrevPath() {
            return previousPath;
        },

        getPrevState: function getPrevState() {
            return previousState;
        },

        goBack: function goBack() {
            $location.url(this.getPrevPath());
        },

        brutalRedirect: function brutalRedirect(url) {
            $window.location.href = url;
            // reload for Safari
            if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
                $window.location.reload(true);
            }
        },

        clickAndGo: function clickAndGo(event) {
            if (event.target.tagName === 'A') {
                $location.url(event.target.hash.replace('#!', ''));
            } else if (!!event.path) {
                for (var k = 0; k < event.path.length; k++) {
                    if (event.path[k].tagName === 'A') {
                        $location.url(event.path[k].hash.replace('#!', ''));
                        break;
                    }
                }
            } else {
                var parentElement = event.target.parentElement;
                while (parentElement) {
                    if (parentElement.tagName === 'A') {
                        $location.url(parentElement.hash.replace('#!', ''));
                        break;
                    } else {
                        parentElement = parentElement.parentElement;
                    }
                }
            }
        },

        mediaMatcher: function mediaMatcher(mediaquery, callback) {
            var isMatchMediaSupported = !!(window && window.matchMedia);
            if (typeof mediaquery === 'string' && typeof callback === 'function' && isMatchMediaSupported) {
                var mql = window.matchMedia(mediaquery);
                callback(mql);
                mql.addListener(callback);
            }
        },

        getQueryParams: function getQueryParams(newUrl) {
            var url = newUrl ? newUrl : $location.absUrl();
            var vars = {};
            var hash;

            if (url.indexOf('?') !== -1) {
                var querystring = url.slice(url.indexOf('?') + 1);
                if (!!querystring) {
                    var hashes = querystring.split('&');
                    for (var i = 0; i < hashes.length; i++) {
                        if (hashes[i].indexOf('=') !== -1) {
                            hash = hashes[i].split('=');
                            if (hash[1].indexOf('#') !== -1) {
                                hash[1] = hash[1].slice(0, hash[1].indexOf('#'));
                            }

                            vars[hash[0]] = window.decodeURIComponent(hash[1]);
                        }
                    }
                }
            }

            return vars;
        },

        addQueryParams: function addQueryParams(newParams, newUrl) {
            var url = newUrl ? newUrl : $location.absUrl();
            var newQueryString = '';

            // reate encoded query string
            for (var key in newParams) {
                newQueryString += encode(key) + '=' + encode(newParams[key]) + '&';
            }
            newQueryString = newQueryString.slice(0, -1);

            var questionMarkIndex = url.indexOf('?');
            if (questionMarkIndex === -1) {
                url += '?' + newQueryString;
            } else {
                url = url.substr(0, questionMarkIndex + 1) + newQueryString + '&' + url.substr(questionMarkIndex + 1);
            }

            return url;

            function encode(string) {
                try {
                    return encodeURIComponent(string);
                } catch (e) {
                    return string;
                }
            }
        }
    };

    return service;
});

var myFunction = function myFunction() {
    var config = {},
        upperCase = false;

    var getNestedKey = function getNestedKey(object, key) {
        key = key.replace(/\[(\w+)\]/g, '.$1');
        key = key.replace(/^\./, '');
        var a = key.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in object) {
                object = object[k];
            } else {
                return undefined;
            }
        }
        return object;
    };

    var myProvider = {

        init: function init(options) {
            if (options && options.config) {
                config = options.config;
                upperCase = options.upperCase || false;
            }
        },

        get: function get(value) {
            var falseValues = ['', 0, '0', null, 'null', false, 'false'];
            value = upperCase ? value.toUpperCase() : value;
            var confValue = value.indexOf('.') !== -1 ? getNestedKey(config, value) : config[value];
            if (falseValues.indexOf(confValue) !== -1) {
                return false;
            } else {
                return confValue;
            }
        },

        list: function list() {
            return config;
        }

    };

    angular.extend(this, myProvider);
    this.$get = [function () {
        return this;
    }];
};

var BarneyConfigFilter = (function (BarneyConfig) {
    return function (input) {
        return BarneyConfig.get(input);
    };
});

var myFunction$1 = function myFunction$1() {
    var parameters = {
        showKey: false
    };

    var myProvider = {

        init: function init(options) {
            if (options) {
                parameters = options;
            }
        },

        get: function get(key) {
            // convert key to upper case
            key = key.toUpperCase();

            if (parameters.showKey === 'all') {

                // 'all case': 
                // valued keys : show key name
                // void keys : show key name
                return '[[' + key + ']]';
            } else if (parameters.showKey === 'missing') {

                // 'missing' case:
                // valued keys : show value of key
                // void keys : show key name
                if (!!parameters.dict[key]) {
                    return parameters.dict[key];
                } else {
                    return '[[' + key + ']]';
                }
            } else {

                // standard case
                // valued keys : show value of key
                // void keys : show void string
                if (!!parameters.dict[key]) {
                    return parameters.dict[key];
                } else {
                    return '';
                }
            }
        },

        list: function list() {
            return parameters.dict;
        }

    };

    angular.extend(this, myProvider);
    this.$get = [function () {
        return this;
    }];
};

var BarneyDictFilter = (function (BarneyDict) {
    return function (key) {
        return BarneyDict.get(key);
    };
});

var BarneyDictDirective = (function ($sce, BarneyDict) {
    return {
        restrict: 'E',
        template: '<span ng-bind-html="value"></span>',
        replace: true,
        scope: {
            key: '@'
        },
        link: function link($scope) {

            $scope.value = $sce.trustAsHtml(BarneyDict.get($scope.key));
        }
    };
});

var BarneyInfiniteScrollDirective = (function ($window, $timeout) {
    return {
        restrict: 'A',
        scope: {
            enable: '=infiniteEnable',
            callback: '&infiniteCallback',
            offset: '@infiniteOffset'
        },
        link: function link($scope, $element) {

            // offset is used to activate infinite scroll before 
            // the end of the window has been reached, 
            // if exist it takes the specified value, else
            // it's equal to 0;
            if (!$scope.offset) {
                $scope.offset = 0;
            }

            var check = function check() {
                var windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body,
                    html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset + parseInt($scope.offset, 10);
                var elementHeight = $element[0].offsetHeight;

                if (elementHeight < windowBottom || windowBottom >= docHeight) {
                    $scope.enable = false;

                    $scope.callback.call()(function () {
                        $timeout(function () {
                            $scope.enable = true;
                        }, 1);
                    });
                }
            };

            var checkIfEnabled = function checkIfEnabled() {
                if ($scope.enable) {
                    check();
                }
            };

            $scope.$watch('enable', function () {
                checkIfEnabled();
            });

            angular.element($window).bind('scroll', checkIfEnabled);

            $scope.$on('$destroy', function () {
                angular.element($window).unbind('scroll', checkIfEnabled);
            });
        }
    };
});

var BarneyLiveHtmlDirective = (function ($compile) {
    return {
        restrict: 'A',
        scope: {
            liveHtml: '='
        },
        controller: function controller($scope, $element) {

            $scope.$watch('liveHtml', function (liveHtml) {
                if (liveHtml) {
                    $element.html(liveHtml);
                    $compile($element.contents())($scope.$parent);
                }
            });

            this.liveScript = function (oldElem) {
                var newEl = document.createElement('script');
                for (k = 0; k < oldElem.attributes.length; k++) {
                    newEl.setAttribute(oldElem.attributes[k].name, oldElem.attributes[k].value);
                }
                oldElem.parentElement.replaceChild(newEl, oldElem);
            };

            this.liveJs = function (scriptElem) {
                Function(scriptElem.innerHTML)(); // eslint-disable-line no-new-func
            };
        }
    };
});

var BarneyLiveHtmlScriptDirective = (function () {
    return {
        restrict: 'E',
        scope: false,
        require: '?^^liveHtml',
        link: function link($scope, $element, $attrs, liveHtmlCtrl) {

            // if <script> is child of live-html directive
            if (liveHtmlCtrl) {

                // if <script src="..."></script>
                if ($element[0].src) {
                    liveHtmlCtrl.liveScript($element[0]);
                }

                // if <script>...</script>
                if ($element[0].innerHTML) {
                    liveHtmlCtrl.liveJs($element[0]);
                }
            }
        }
    };
});

var BarneyMeta = (function ($rootScope) {

    $rootScope.meta = {};
    $rootScope.defaultMeta = {};

    var service = {

        init: function init(metatags) {
            for (var key in metatags) {
                $rootScope.defaultMeta[key] = metatags[key];
                $rootScope.meta[key] = metatags[key];
            }

            // revert to default keys
            var _this = this;
            $rootScope.$on('$routeChangeStart', function () {
                _this.revert();
            });
        },

        get: function get(key) {
            if (!!$rootScope.meta[key]) {
                return $rootScope.meta[key];
            } else {
                return '';
            }
        },

        set: function set(metatags) {
            for (var key in metatags) {
                $rootScope.meta[key] = metatags[key];
            }
        },

        list: function list() {
            return $rootScope.meta;
        },

        defaults: function defaults() {
            return $rootScope.defaultMeta;
        },

        revert: function revert() {
            for (var key in $rootScope.defaultMeta) {
                $rootScope.meta[key] = $rootScope.defaultMeta[key];
            }
        }

    };

    return service;
});

var appName = 'barneyjs';

angular.module(appName, []).factory('BarneyBrowser', BarneyBrowser).provider('BarneyConfig', myFunction).filter('config', BarneyConfigFilter).provider('BarneyDict', myFunction$1).filter('dict', BarneyDictFilter).directive('dict', BarneyDictDirective).directive('infiniteScroll', BarneyInfiniteScrollDirective).directive('liveHtml', BarneyLiveHtmlDirective).directive('script', BarneyLiveHtmlScriptDirective).factory('BarneyMeta', BarneyMeta);

return appName;

})));
//# sourceMappingURL=index.umd.js.map
