const UserData = require('../db-schema/dummy/User.json');
const HotelData = require('../db-schema/dummy/Hotel.json');

const User = require('../db-schema/User.js');
const Hotel = require('../db-schema/Hotel.js');

const LOG = require('../utils/logger.js');

const initialise = () => {
    User.find({}).deleteMany({}, (err) => {
        if(err) {
            return;
        }
        User.find({}, function (error, docs) {
            if (docs.length) {
                LOG.info('User data is ready.');
            } else {
                for (var i = 0; i < UserData.data.length; i++) {
                    let user = new User(UserData.data[i]);
                    user.save((err) => {
                        if (!err) {
                            LOG.trace('User created.');
                        }
                    });
                }
            }
        });
    });
    
    Hotel.find({}).deleteMany({}, (err) => {
        if(err) {
            return;
        }
        Hotel.find({}, function (error, docs) {
            if (docs.length) {
                LOG.info('Hotel data is ready.');
            } else {
                for (var i = 0; i < HotelData.data.length; i++) {
                    let hotel = new Hotel(HotelData.data[i]);
                    hotel.save((err) => {
                        if (!err) {
                            LOG.trace('hotel created.');
                        }
                    });
                }
            }
        });
    });
}

module.exports = { initialise };
