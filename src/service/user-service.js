// import lodash utility
const _ = require('lodash');

// import utility to utilise DRY and generic methods
const UTILITY = require('../utils/utility.js');

// import Log to log all actions performed.
const LOG = require('../utils/logger.js');

const User = require('../db-schema/User.js');

/**
 * Service to get All Users in DB.
 * 
 * @param {object} requestBody
 * @param {object} reply
 */
const getAllUsers = async () => {
    return await User.find({}).exec();
}

/**
 * Service to Book hotel by utilising Existing Users Bonus Points.
 * 
 * @param {object} requestBody
 * @param {object} reply
 */
const getSpecificUser = async (requestBody) => {
    return await User.findOne({_id: requestBody._id});
}

/**
 * Deduct Bonus Point.
 * 
 * @param {object} user 
 * @param {object} price 
 * @param {object} requestBody 
 */
const deductBonusPointsAndBook = async (user, price, requestBody) => {
    LOG.info('User data before Deduction: ' + JSON.stringify(user._doc));
    let newBonusPoint = user.bonusPoints - price;
    user.bonusPoints = newBonusPoint;
    user._doc.historicalBonusBookings.push(requestBody.roomid);
    user._doc.historicalBookings.push(requestBody.roomid);
    await user.save();
    LOG.info('User data After Deduction: ' + JSON.stringify(user._doc));
    LOG.info('Bonus Successfully deducted.');
    return true;
}

/**
 * Assign Room ID for a hotel as Queued Bonus Point Booking for User.
 * 
 * @param {*} user 
 * @param {*} roomId 
 */
const queueBonusPointBookings = async (user, roomId) => {
    LOG.info('Queueing Room ID under bonus booking for a user.');
    LOG.info('User data before queuing Bonus Point Bookings: ' + JSON.stringify(user._doc));
    user._doc.queuedBonusPointBookings.push(roomId);
    await user.save();
    LOG.info('User data after queuing Bonus Point Bookings: ' + JSON.stringify(user._doc));
    return 'Booking pending for approval';
}

/**
 * Module Exports for other files to access.
 */
module.exports = {
    getAllUsers,
    getSpecificUser,
    deductBonusPointsAndBook,
    queueBonusPointBookings
}