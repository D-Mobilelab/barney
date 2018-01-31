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
