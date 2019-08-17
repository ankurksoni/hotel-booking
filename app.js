const routes = require('./src/route/routes.js');
const LOG = require('./src/utils/logger.js');
const CONFIG = require('./src/config/config.json');
const UTILITY = require('./src/utils/utility.js');

// Import Swagger Options
const SWAGGER = require('./src/utils/swagger.js');

// Require the framework and instantiate it
const app = require('fastify')({
    logger: CONFIG.isFastifyDebugEnabled
});

// Register Swagger
app.register(require('fastify-swagger'), SWAGGER.options)

// Declare a default route.
app.get('/', async (request, reply) => {
    reply.code(UTILITY.HTTP_STATUS_CODE.SUCCESS).send('Hotel Booking Server is Alive.')
});

routes.forEach((route, index) => {
    app.route(route);
    LOG.info("--------------------------------------------");
    LOG.info("Ready Route " + (index + 1) + ": [ Method: " + route.method + " ][ ROUTE: " + route.url + " ]");
});

module.exports = app;
