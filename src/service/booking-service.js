// import lodash utility
const _ = require('lodash');

// import Log to log all actions performed.
const LOG = require('../utils/logger.js');

// import User related Services.
const userService = require('../service/user-service.js');

// import hotel related Services
const hotelService = require('../service/hotel-service.js');

/**
 * Inititate Booking Process.
 * 
 * @param {object} user 
 * @param {object} hotel 
 * @param {object} requestBody 
 */
const initiateBooking = async (user, hotel, requestBody) => {
    LOG.info('Initiating Booking.');
    let bookStatus = await hotelService.bookRoom(hotel, requestBody);
    if (bookStatus) {
        LOG.info('Process Started for deducting Bonus points.');
        let userStatus = await userService.deductBonusPointsAndBook(user, hotel.price, requestBody);
        return 'Booking successful';
    }
}

/**
 * Inititate Pending Booking Process.
 * 
 * @param {object} user 
 * @param {object} hotel 
 * @param {object} requestBody 
 */
const initiatePendingApproval = async (user, hotel, requestBody) => {
    LOG.info('Initiating Pending Approval Process.');
    let pendingApprovalStatus = await userService.queueBonusPointBookings(user, requestBody.roomid);
    return pendingApprovalStatus;
}

/**
 * Module Exports for other files to access.`
 */
module.exports = {
    initiateBooking,
    initiatePendingApproval
}