(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass')) :
  typeof define === 'function' && define.amd ? define(['exports', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass'], factory) :
  (factory((global.barneyjs = global.barneyjs || {}),global._classCallCheck,global._createClass));
}(this, (function (exports,_classCallCheck,_createClass) { 'use strict';

_classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
_createClass = 'default' in _createClass ? _createClass['default'] : _createClass;

/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var Greeting = function () {
  function Greeting(name) {
    _classCallCheck(this, Greeting);

    this.name = name || 'Guest';
  }

  _createClass(Greeting, [{
    key: 'hello',
    value: function hello() {
      return 'Welcome, ' + this.name + '!';
    }
  }]);

  return Greeting;
}();

/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

exports.Greeting = Greeting;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
