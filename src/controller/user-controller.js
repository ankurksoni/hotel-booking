// External Boom Dependencies
const boom = require('boom');

// initialise book service
const userService = require('../service/user-service.js');

// Logger import
const LOG = require('../utils/logger.js');

// import utility
const UTILITY = require('../utils/utility.js');

/**
 * Get All users.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const getAllUsers = async (req, reply) => {
    try {
        LOG.trace('Get All User details operation initiated.');
        const users = await userService.getAllUsers();
        let response = {
            records : users
        }
        LOG.info('Get All Users : Records obtained:-> ' + JSON.stringify(response));
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(response);
      } catch (err) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
      }
};

/**
 * Get Specific user details.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const getUser = async (req, reply) => {
    try {
        LOG.trace('Get User details operation initiated.');
        const user = await userService.getSpecificUser(req.body);
        let response = {
            record : user
        }
        LOG.info('Get specific user : Record obtained:-> ' + JSON.stringify(response));
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(response);
    } catch (err) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
    }
};

/**
 * Export function as single entry point.
 */
module.exports = {
    getAllUsers,
    getUser
};