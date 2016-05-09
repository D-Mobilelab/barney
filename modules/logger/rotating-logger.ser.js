/**
* @ngdoc object
* @name logger.BarneyRotatingLogger
*
* @description
* Use **RotatingLogger** service.
*
* To use **RotatingLogger** service, you have to add **BarneyRotatingLogger** dependency to your component (i.e: directive, controller...).
*
* ***Remember that RotatingLogger requires BaseLogger to work 
* ( but it doesn't requires BaseLogger service ).***
*
* In this example, I have added dependency of **BarneyRotatingLogger** to a controller:
* <pre>
* angular.module('mock').controller('HomePageController', [
*     'BarneyRotatingLogger', '$scope',
*     function(RotatingLogger, $scope){
*         // we can use "RotatingLogger" object here
*     }
* ]);
* </pre>
* Note that I included **BarneyRotatingLogger** as dependency but I have renamed it as **RotatingLogger** to use it more easily in controller code.
*
* # Enable/Disable Logger
* To **enable** or **disable** **RotatingLogger** just call init with enabled:true/false.
*
* <pre>
*  RotatingLogger.init({enabled:true})  //RotatingLogger is now enabled
*
*  RotatingLogger.init({enabled:false}) //RotatingLogger is now disabled
* </pre>
*
*
* # List Methods
*
*  - {@link logger.BarneyRotatingLogger#methods_endRecording endRecording}.
*  - {@link logger.BarneyRotatingLogger#methods_error error}.
*  - {@link logger.BarneyRotatingLogger#methods_getConfig getConfig}.
*  - {@link logger.BarneyRotatingLogger#methods_info info}.
*  - {@link logger.BarneyRotatingLogger#methods_init init}.
*  - {@link logger.BarneyRotatingLogger#methods_isEnabled isEnabled}.
*  - {@link logger.BarneyRotatingLogger#methods_log log}.
*  - {@link logger.BarneyRotatingLogger#methods_startRecording startRecording}.
*  - {@link logger.BarneyRotatingLogger#methods_table table}.
*  - {@link logger.BarneyRotatingLogger#methods_warn warn}.
*
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#log
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_log here} to see log() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#table
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_table here} to see table() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#info
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_info here} to see info() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#warn
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_warn here} to see warn() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#error
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_error here} to see error() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#isEnabled
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is the same used in **BarneyLogger**, click {@link logger.BarneyLogger#methods_isEnabled here} to see isEnabled() documentation.
 *
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#init
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method is used to initialize or to change the configuration of 
 * the Rotating Logger's module. Call init whenever you need to change the Rotating Logger's configuration. 
 *
 * Remember to see **BaseLogger** {@link logger.BarneyLogger#methods_init init()} documentation to configure also the **BaseLogger** functionality.
 *
 * ***Is recommended to initialize RotatingLogger in app.js so 
 * remember that if you change RotatingLogger' s configuration in a new page you also change 
 * the configuration in ALL your site ***
 *
 * @param {Object} options (see attributes below)
 * @param {Integer} [options.maxSize=100] maxSize defines the max number of messages recorded.
 * @param {boolean} [options.sliding=true] Enables "sliding window" recording.
 *
 * If enabled, the logger will record the last records only (<= maxSize)
 *
 * If not enabled, the logger will automatically save a list of messages when length = maxSize 
 * @param {boolean} [options.recordingEnabled=true] Enables message recording
 *
 * If disabled, no messages are recorded (even between startRecording and endRecording)
 *
 * @param {function} [options.saveRecords=exports JSon file] Function used to export recorded messages.
 *
 * @example
 * # Logger Init 
 * Here is one example of the init method.
 *
 * **RotatingLogger initialization**
 * <pre>
 * 
 *   RotatingLogger.init({
 *      maxSize: 100, //set maxSize to 100
 *      sliding: true, //enables sliding mode
 *      recordingEnabled: true, //enable recording
 *      enabled: true //enable logger
 *   }); 
 *
 * </pre>
 * 
 * **RotatingLogger initialization with custom saveRecords**
 *
 * Here is an example of initialization where saveRecords sends messages calling an API.
 * <pre>
 * 
 *   RotatingLogger.init({
 *      ...,
 *      saveRecords: function(messages){
 *          API_send(messages)
 *      }
 *   }); 
 *
 * </pre>
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#getConfig
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 * This method wraps original BaseLogger's getConfig function
 * adding maxSize attribute, click {@link logger.BarneyLogger#methods_getConfig here} to see getConfig() documentation.
*/


/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#endRecording
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 *
 * This method tells **RotatingLogger** to stop recording messages and 
 * calls internal function saveRecords (set within init method).
 *
 * If you're not recording it will show an error message.
 *
 * **Remember that first you have to start a recording with the startRecording method**
 * @example
 * # RotatingLogger endRecording
 *
 * This is an example of how to use **endRecording** method
 * <pre>
 *  //Stop recording and saves records
 *  RotatingLogger.endRecording()  
 *
 *
 * </pre>
*/

/**
 * @ngdoc function
 * @name logger.BarneyRotatingLogger#startRecording
 * @methodOf logger.BarneyRotatingLogger
 *
 * @description 
 *
 * This method starts the recording of all the messages logged by RotatingLogger.
 *
 * ***Remember that recordingEnabled must be set to true to record*** 
 *
 * @example
 * # RotatingLogger startRecording
 *
 * This is an example of how to use **startRecording** method
 * <pre>
 *  RotatingLogger.startRecording() // Start recording
 * </pre>
 *
*/

angular.module('barney').factory('BarneyRotatingLogger', function(){

    return RotatingLog;
});