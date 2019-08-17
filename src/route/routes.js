const routesDef = require('./routes-def.js');

const routes = [
    routesDef.bookHotel,
    routesDef.getAllUsers,
    routesDef.getUser,
    routesDef.getAllHotels,
    routesDef.getHotel,
    routesDef.getAvailableHotelRoom
]

module.exports = routes;