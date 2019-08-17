const bookingController = require('../controller/booking-controller.js');
const userController = require('../controller/user-controller.js');
const hotelController = require('../controller/hotel-controller.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const ERROR_MAPPINGS = {
    400: "Bad request",
    406: "Not Acceptable",
    500: "Internal Server Error"
}

const replyError = (errorMessage, statusCode, reply) => {
    let response = {
        "statusCode": statusCode,
        "error": ERROR_MAPPINGS[statusCode],
        "message": errorMessage
    }
    reply.status(statusCode);
    reply.send(response);
}

const dataDetailsSchema = {
    type: 'object',
    required: ['_id', 'value'],
    properties: {
        _id: { type: 'string' },
        value: { type: 'string' },
    }
};

const dataSchema = {
    type: 'array',
    minItems: 1,
    items: dataDetailsSchema
};

const idSchema = {
    type: 'array',
    minItems: 1,
    items: { type: 'string' }
};

const deleteJSONSchema = {
    type: 'object',
    required: ['mongoHost', 'port', 'dbName', 'ids'],
    properties: {
        mongoHost: { type: 'string' },
        port: { type: 'number' },
        dbName: { type: 'string' },
        ids: idSchema
    }
};

const updateJSONSchema = {
    type: 'object',
    required: ['mongoHost', 'port', 'dbName', 'data'],
    properties: {
        mongoHost: { type: 'string' },
        port: { type: 'number' },
        dbName: { type: 'string' },
        data: dataSchema
    }
};

const getuserSchema = {
    type: 'object',
    required: ['_id'],
    properties: {
        _id: { type: 'string' }
    }
};

const bookingJSONSchema = {
    type: 'object',
    required: ['userid', 'roomid'],
    properties: {
        userid: { type: 'string' },
        roomid: { type: 'string' }
    }
};

const bookHotel = {
    method: 'POST',
    url: '/book-by-bonus-points',
    schema: {
        body: bookingJSONSchema
    },
    handler: bookingController.bookByBonusPoints
}

const getAllUsers = {
    method: 'GET',
    url: '/get-all-users',
    handler: userController.getAllUsers
}

const getUser = {
    method: 'POST',
    url: '/get-user',
    schema: {
        body: getuserSchema
    },
    handler: userController.getUser
}

const getAllHotels = {
    method: 'GET',
    url: '/get-hotels',
    handler: hotelController.getAllHotels
}

const getHotel = {
    method: 'POST',
    url: '/get-hotel',
    schema: {
        body: getuserSchema
    },
    handler: hotelController.getHotel
}

const getAvailableHotelRoom = {
    method: 'POST',
    url: '/get-hotel-room',
    schema: {
        body: getuserSchema
    },
    handler: hotelController.getAvailableHotelRoom
}

module.exports = {
    bookHotel,
    getAllUsers,
    getUser,
    getAllHotels,
    getHotel,
    getAvailableHotelRoom
};