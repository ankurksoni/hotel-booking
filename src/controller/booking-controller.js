// External Boom Dependencies
const boom = require('boom');

// initialise book service
const bookingService = require('../service/booking-service.js');

// import user services
const userService = require('../service/user-service.js');

// import hotel services
const hotelService = require('../service/hotel-service.js');

// Logger import
const LOG = require('../utils/logger.js');

// import Utility
const UTILITY = require('../utils/utility.js');

/**
 * A booking feature only by using Existing User's Bonus Points.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const bookByBonusPoints = async (req, reply) => {
    let requestBody = req.body;
    try {
        LOG.trace('Initiating Book by Bonus Points Service.');
        // GET User Details from userid
        LOG.info('Getting Specific User.');
        let user = await userService.getSpecificUser({ _id: requestBody.userid });
        // GET hotel details from hotelid
        if (!user) {
            reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send('No User identified.');
        }
        LOG.info('Getting available Hotel Room');
        let hotel = await hotelService.getAvailableHotelRoom({ _id: requestBody.roomid });
        if (!hotel) {
            reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send('No Hotel Room identified.');
        }
        let status = 'No Status';
        LOG.info('Checking Bonus Status.');
        // check if user.bonusPoints === hotel.bookingPrice
        if (user.bonusPoints >= hotel.price) {
            status = await bookingService.initiateBooking(user, hotel, requestBody);
        } else {
            status = await bookingService.initiatePendingApproval(user, hotel, requestBody);
        }
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(status);
    } catch (error) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
};

/**
 * Export function as single entry point.
 */
module.exports = {
    bookByBonusPoints
};