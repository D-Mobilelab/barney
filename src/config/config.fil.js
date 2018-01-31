/**
 * @ngdoc filter
 * @name config.filter:config
 *
 * @description
 * You can get a config value using the custom config filter
 *
 * @example
 * <pre>
 *  // javascript
 *  BarneyConfig.init({ 'ENABLE_LOGIN' : 1 });
 *
 *  // html
 *  {{'ENABLE_LOGIN' | config}}
 *  // it prints 1
 * </pre>
 */

export default (BarneyConfig) => {

    return function(input) {
        return BarneyConfig.get(input);
    };
    
};