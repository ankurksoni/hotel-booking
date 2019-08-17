// import lodash utility
const _ = require('lodash');

// import utility to utilise DRY and generic methods
const UTILITY = require('../utils/utility.js');

// import Log to log all actions performed.
const LOG = require('../utils/logger.js');

const Hotel = require('../db-schema/Hotel.js');

/**
 * Get All Hotels.
 * 
 * @param {object} requestBody
 * @param {object} reply
 */
const getAllHotels = async () => {
    return await Hotel.find({}).exec();
}

/**
 * Get Specific Hotel.
 * 
 * @param {object} requestBody
 * @param {object} reply
 */
const getSpecificHotel = async (requestBody) => {
    return await Hotel.findOne({ _id: requestBody._id });
}

/**
 * Get Hotel Room.
 * 
 * @param {object} requestBody
 * @param {object} reply
 */
const getAvailableHotelRoom = async (requestBody) => {
    return await Hotel.findOne({ availableRoomIds: requestBody._id });
}

/**
 * Book the Hotel Room.
 * 
 * @param {object} hotel 
 * @param {object} requestBody 
 */
const bookRoom = async (hotel, requestBody) => {
    LOG.info('Hotel Before update: ' + JSON.stringify(hotel._doc));
    hotel._doc.availableRoomIds.pull(requestBody.roomid);
    hotel._doc.bookedRoomIds.push(requestBody.roomid);
    await hotel.save();
    LOG.info('Hotel After update: ' + JSON.stringify(hotel._doc));
    return true;
}

/**
 * Module Exports for other files to access.`
 */
module.exports = {
    getAllHotels,
    getSpecificHotel,
    getAvailableHotelRoom,
    bookRoom
}