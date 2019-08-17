
// import Mongoose package
const mongoose = require('mongoose');

// import configuration parameters
const config = require('../config/config.json');

// Database URI
const DB_URI = `mongodb://${config.dbconfig.host}:${config.dbconfig.port}/${config.dbconfig.databaseName}`;

// Import Logger to log actions
const LOG = require('./logger.js');

// const for TEST_ENV
const TEST_ENV = 'test';

// Sample Data
const initDB = require('./../utils/init-db.js');

// require Mockgoose
const Mockgoose = require('mockgoose').Mockgoose;
            
// Instance for Mockgoose
const mockgoose = new Mockgoose(mongoose);

// Establish DB Connection
const establishConnection = (resolve, reject) => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then((response, error) => {
        if(error) {
            return reject(err);
        } else {
            initDB.initialise();
            LOG.trace('Response: ' + response);
            resolve();
        }
    })
}

/**
 * Module to Establish Connection.
 * 
 */
const connect = () => {
    return new Promise((resolve, reject) => {
        establishConnection(resolve, reject);
    })
}

/**
 * Module to close connection.
 */
const close = () => {
    return mongoose.disconnect();
}

/**
 * Module to Export functionality.
 */
module.exports = { connect, close };
