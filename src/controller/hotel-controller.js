// initialise book service
const hotelService = require('../service/hotel-service.js');

//Logger import
const LOG = require('../utils/logger.js');

// import utility
const UTILITY = require('../utils/utility.js');

/**
 * Get All Hotels.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const getAllHotels = async (req, reply) => {
    try {
        const hotels = await hotelService.getAllHotels();
        let response = {
            records: hotels
        }
        LOG.info('Get All hotels : Records obtained:-> ' + JSON.stringify(response));
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(response);
    } catch (err) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
    }
};

/**
 * Get specific Hotel details.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const getHotel = async (req, reply) => {
    try {
        const hotel = await hotelService.getSpecificHotel(req.body);
        let response = {
            record: hotel
        }
        LOG.info('Get specific hotel : Record obtained:-> ' + JSON.stringify(response));
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(response);
    } catch (err) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
    }
};

/**
 * Get Available Hotel room.
 * 
 * @param {object} req 
 * @param {object} reply 
 */
const getAvailableHotelRoom = async (req, reply) => {
    try {
        const hotel = hotelService.getAvailableHotelRoom(req.body);
        let response = {
            record: hotel
        }
        LOG.info('Get specific available hotel room : Record obtained:-> ' + JSON.stringify(response));
        reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send(response);
    } catch (err) {
        reply.code(UTILITY.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
    }
}

/**
 * Export function as single entry point.
 */
module.exports = {
    getAllHotels,
    getHotel,
    getAvailableHotelRoom
};