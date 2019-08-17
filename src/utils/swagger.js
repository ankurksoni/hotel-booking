const CONFIG = require('../config/config.json');

/**
 * Swagger options exposed as one fo the routes.
 * Example: Here http://localhost:5000/docs
 */
exports.options = {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Hotel Booking Server APIs',
        description: 'Building a blazing fast REST API with Node.js, Fastify and Swagger',
        version: '1.0.0'
      },
      host: 'localhost:' + CONFIG.serverPort,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }