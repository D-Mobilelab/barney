import angular from 'angular';

import BarneyBrowser from './browser/browser.ser';
import BarneyConfig from './config/config.pro';
import BarneyConfigFilter from './config/config.fil';
import BarneyDict from './dict/dict.pro';
import BarneyDictFilter from './dict/dict.fil';
import BarneyDictDirective from './dict/dict.dir';
import BarneyInfiniteScrollDirective from './infinite/infinite-scroll.dir';
import BarneyLiveHtmlDirective from './livehtml/live-html.dir';
import BarneyLiveHtmlScriptDirective from './livehtml/script.dir';
import BarneyMeta from './meta/meta.ser';

const appName = 'barney';

angular.module(appName)
    .factory('BarneyBrowser', BarneyBrowser)

    .provider('BarneyConfig', BarneyConfig)
    .filter('config', BarneyConfigFilter)

    .provider('BarneyDict', BarneyDict)
    .filter('dict', BarneyDictFilter)
    .directive('dict', BarneyDictDirective)

    .directive('infiniteScroll', BarneyInfiniteScrollDirective)

    .directive('liveHtml', BarneyLiveHtmlDirective)
    .directive('script', BarneyLiveHtmlScriptDirective)

    .factory('BarneyMeta', BarneyMeta)  
;