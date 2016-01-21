/**
* @ngdoc object
* @name logger.BarneyLogger
*
* @description
* Use Logger service.
*
* To use **Logger** service, you have to add **BarneyLogger** dependency to your component (i.e: directive, controller...).
*
* In this example, I have added dependency of BarneyLogger to a controller:
* <pre>
* angular.module('mock').controller('HomePageController', [
*     'BarneyLogger', '$scope',
*     function(Logger, $scope){
*         // we can use "Logger" object here
*     }
* ]);
* </pre>
* Note that I included BarneyLogger as dependency but I have renamed it as Logger to use it more easily in controller code.
*
* # Enable/Disable Logger
* To **enable** or **disable** logger just call init with enabled:true/false.
*
* <pre>
*  Logger.init({enabled:true})  //Logger is now enabled
*
*  Logger.init({enabled:false}) //Logger is now disabled
* </pre>
*
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#init
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method is used to initialize or to change the configuration of 
 * the Logger's module. Call init whenever you need to change the Logger's configuration. 
 *
 * ***Is recommended to initialize Logger in app.js so 
 * remember that if you change Logger's configuration in a new page you also change 
 * the configuration in ALL your site ***
 *
 * @param {Object} options (see attributes below)
 * @param {boolean} [options.enabled=true] Enable/Disable the Logger
 * @param {string} [options.level='log'] Actives all levels following the given
 * @param {Object} [options.levels=undefined] Levels contains the manual configuration of the Logger.
 * @param {function} [options.emit=Logger.emit()] Emit is an addictional parameter that allows you to use a custom function as an emitter.
 *
 * @example
 * # Logger Init 
 * Here are some examples of the init method.
 *
 * **Default initialization**
 * <pre>
 * 
 *   Logger.init({
 *      level: 'log', //set all level to true
 *      enabled: true //enables logger
 *   }); 
 *
 * </pre>
 *
 * **Logger with manual configuration**
 *
 * I want that logger logs only logs, warnings and errors
 * <pre>
 *     Logger.init({
 *      levels: { 
 *         'log': true, 
 *         'info': false,
 *         'table': false  
 *         'warn': true,
 *         'error': true
 *       },
 *       enabled: true //enables logger
 *      }); 
 *
 * </pre>
 *
 * **Logger with level configuration and personalized emit**
 *
 * I want that logger logs only warning and error
 * <pre>
 *     Logger.init({
 *       level: 'warn',  //Logger now logs only warnings and errors
 *       emit: function(level, args){
 *               console[level](args); //log args
 *               
 *               // Do something, i.e: sends error, store something etc.
 *             },
 *        enabled: true //enables logger
 *      }); 
 *
 * </pre>
 * 
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#log
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method for each log level.
 * Each method uses the general function emit to log messages
 *
 * ***Log level must be true and logger must be enabled***
 *
 * @param {*} arguments Arguments to log
 *
 * @example
 * # Logger log 
 * Here is one example of the Log method.
 *
 * <pre>
 *     Logger.log('Hello World!') //Logs Hello World
 * </pre>
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#table
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method for each table level.
 * Each method uses the general function emit as table messages
 *
 * ***Table level must be true and logger must be enabled***
 *
 * @param {*} arguments Arguments to log
 *
 * @example
 * # Logger table 
 * Here is one example of the Table method.
 *
 * <pre>
 *     Logger.table({Hello:'World'}) //Logs World in table at the key Hello
 * </pre>
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#info
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method for each info level.
 * Each method uses the general function emit as info messages
 *
 * ***Info level must be true and logger must be enabled***
 *
 * @param {*} arguments Arguments to log
 *
 * @example
 * # Logger info 
 * Here is one example of the Info method.
 *
 * <pre>
 *     Logger.info('Hello World!') //Logs Hello World as an info message
 * </pre>
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#warn
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method for each warn level.
 * Each method uses the general function emit as a warning messages
 *
 * ***Warn level must be true and logger must be enabled***
 *
 * @param {*} arguments Arguments to log
 *
 * @example
 * # Logger warn 
 * Here is one example of the Warn method.
 *
 * <pre>
 *     Logger.warn('Hello World!') //Logs Hello World as a warning message
 * </pre>
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#error
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method for each error level.
 * Each method uses the general function emit as error messages
 *
 * ***Error level must be true and logger must be enabled***
 *
 * @param {*} arguments Arguments to log
 *
 * @example
 * # Logger error 
 * Here is one example of the Error method.
 *
 * <pre>
 *     Logger.error('Hello World!') //Logs Hello World as an error message
 * </pre>
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyLogger#isEnabled
 * @methodOf logger.BarneyLogger
 *
 * @description 
 * This method defines a method to know if Logger is enabled or not;
 * 
 *
 * @example
 * # Logger isEnabled 
 * Here is one example of the isEnabled method.
 *
 * <pre>
 *     if(Logger.isEnabled()){
 *          //Do something
 *      } else {
 *          //Do something else
 *      }
 * </pre>
 *
*/

angular.module('barney.logger').factory('BarneyLogger', function(){
    
    var logger = new BaseLogger();

    return logger;
});