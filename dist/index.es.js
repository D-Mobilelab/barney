import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

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

export { Greeting };
//# sourceMappingURL=index.es.js.map
