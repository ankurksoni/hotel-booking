const config = require("../config/config.json");
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
/**
 * Creates a writable stream that formats bunyan records written to it.
 *  - outputMode: short|long|simple|json|bunyan
 *  - color (true): toggles colors in output
 *  - colorFromLevel: allows overriding log level colors
 * {Stream} (process.stdout) writable stream to write 
 * {WritableStream} that you can pipe bunyan output into
 */
const bunyanConsole = bformat({ outputMode: 'short' });

/**
 * Create Bunyan Rotation Log Stream
 */
const bunyanRotationLogStream = {
    type: 'rotating-file',
    path: config.logger.dirname + '/' + config.logger.filename,
    period: config.log.rotationLog.period,   // daily rotation
    count: config.log.rotationLog.count,        // keep 3 back copies
    level: config.log.rotationLog.level
}

/**
 * Create Bunyan Fata Rotation Log Stream
 */
const bunyanFatalRotationLogStream = {
    type: 'rotating-file',
    path: config.logger.dirname + '/' + config.logger.fatalfilename,
    period: config.log.rotationFatalLog.period,   // daily rotation
    count: config.log.rotationFatalLog.count,        // keep 3 back copies
    level: config.log.rotationFatalLog.level
}

/**
 * Create Logger instance
 */
const logger = bunyan.createLogger({
    name: 'rpt',
    streams: [
        {
            stream: bunyanConsole,
            level: config.log.consoleLog.level
        },
        bunyanRotationLogStream,
        bunyanFatalRotationLogStream
    ]
});

/**
 * Log trace level logs
 * @param {string} message 
 */
const trace = function (message) {
    logger.trace(message);
}

/**
 * Log debug level logs
 * @param {string} message 
 */
const debug = function (message) {
    logger.debug(message);
}

/**
 * Log info level logs
 * @param {string} message 
 */
const info = function (message) {
    logger.info(message);
}

/**
 * Log warn level logs
 * @param {string} message 
 */
const warn = function (message) {
    logger.warn(message);
}

/**
 * Log error level logs
 * @param {string} message 
 */
const error = function (message) {
    logger.error(message);
}

/**
 * Log fatal level logs
 * @param {string} message 
 */
const fatal = function (message) {
    logger.fatal(message);
}

module.exports = {
    trace,
    debug,
    info,
    warn,
    error,
    fatal
};
