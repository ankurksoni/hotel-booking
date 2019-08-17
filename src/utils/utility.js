const CONFIG = require('../config/config.json');
const _ = require('lodash');

/** @constant {Object} */
const DATA_TYPE = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean",
    OBJECT: "object"
};

/** @constant {Object} */
const HTTP_STATUS_CODE = {
    SUCCESS : 200,
    BAD_REQUEST : 406,
    NOT_ACCEPTABLE : 406,
    INTERNAL_SERVER_ERROR : 500

}

/** @constant {Object} */
const dbconfig = {
    db: {
        raw: CONFIG.dbconfig.db.raw
      },
      server: {
        poolSize: CONFIG.dbconfig.server.poolSize,
        socketOptions: {
            connectTimeoutMS : CONFIG.dbconfig.server.socketOptions.connectTimeoutMS
          }
      }
};

/**
 * Efficiently calculates the comma separated string
 * passed into the method. The input is expected in below format,
 * 
 * concat("This","is","an","example") return "Thisisanexample"
 *
 * @param {string} strings comma separated strings.
 */
const concat = (...strings) => {
    return _.reduce(strings, (accumulator, currentItem) => {
        return accumulator + currentItem;
    });
};

/**
 * validate the configuration parameter is valid with given conditions
 * 
 */
const validateConfigfileParameters = () => {
    checkIfExists(CONFIG.isFastifyDebugEnabled, "CONFIG.isFastifyDebugEnabled", DATA_TYPE.Boolean);
    checkIfExists(CONFIG.serverHost, "CONFIG.serverHost", DATA_TYPE.STRING);
    
    checkIfExists(CONFIG.logger, "CONFIG.logger", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.logger.filename, "CONFIG.logger.filename", DATA_TYPE.STRING);
    checkIfExists(CONFIG.logger.fatalfilename, "CONFIG.logger.fatalfilename", DATA_TYPE.STRING);
    checkIfExists(CONFIG.logger.dirname, "CONFIG.logger.dirname", DATA_TYPE.STRING);

    checkIfExists(CONFIG.log, "CONFIG.log", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.log.rotationLog, "CONFIG.log.rotationLog", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.log.rotationLog.period, "CONFIG.log.rotationLog.period.", DATA_TYPE.STRING);
    checkIfExists(CONFIG.log.rotationLog.count, "CONFIG.log.rotationLog.count", DATA_TYPE.NUMBER);
    checkIfExists(CONFIG.log.rotationLog.level, "CONFIG.log.rotationLog.level", DATA_TYPE.STRING);

    checkIfExists(CONFIG.log.rotationFatalLog, "CONFIG.log.rotationFatalLog", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.log.rotationFatalLog.period, "CONFIG.log.rotationFatalLog.period", DATA_TYPE.STRING);
    checkIfExists(CONFIG.log.rotationFatalLog.count, "CONFIG.log.rotationFatalLog.count", DATA_TYPE.NUMBER);
    checkIfExists(CONFIG.log.rotationFatalLog.level, "CONFIG.log.rotationFatalLog.level", DATA_TYPE.STRING);

    checkIfExists(CONFIG.log.consoleLog, "CONFIG.log.consoleLog", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.log.consoleLog.level, "CONFIG.log.consoleLog.level", DATA_TYPE.STRING);

    checkIfExists(CONFIG.dbconfig, "CONFIG.dbconfig", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.dbconfig.host, "CONFIG.dbconfig.host", DATA_TYPE.STRING);
    checkIfExists(CONFIG.dbconfig.port, "CONFIG.dbconfig.port", DATA_TYPE.NUMBER);
    checkIfExists(CONFIG.dbconfig.hostName, "CONFIG.dbconfig.hostName", DATA_TYPE.STRING);
    checkIfExists(CONFIG.dbconfig.db, "CONFIG.dbconfig.db", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.dbconfig.db.raw, "CONFIG.dbconfig.db.raw", DATA_TYPE.BOOLEAN);
    checkIfExists(CONFIG.dbconfig.server, "CONFIG.dbconfig.server", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.dbconfig.server.poolSize, "CONFIG.dbconfig.server.poolSize", DATA_TYPE.NUMBER);
    checkIfExists(CONFIG.dbconfig.server.socketOptions, "CONFIG.dbconfig.server.socketOptions", DATA_TYPE.OBJECT);
    checkIfExists(CONFIG.dbconfig.server.socketOptions.connectTimeoutMS, "CONFIG.dbconfig.server.socketOptions.connectTimeoutMS", DATA_TYPE.NUMBER);
};

/**
 * Get connection string to connect to the database.
 * 
 * @param {string} host 
 * @param {number} port 
 * @param {string} dbName 
 */
const getConnectionString = (host='localhost', port=27017, dbName='emgda') => {
    return `mongodb://${host}:${port}/${dbName}`
}

/**
 * Get DB Configuration Parameters
 */
const getDbConfigParams = () => {
    return dbconfig;
}

/**
 * Throw Error.
 * 
 * @param {object} reply 
 * @param {object} err 
 */
const throwError = (reply, err) => {
    reply.code(500).send({message: err});
}

module.exports = {
    HTTP_STATUS_CODE,
    validateConfigfileParameters,
    getConnectionString,
    getDbConfigParams,
    concat,
    throwError
};