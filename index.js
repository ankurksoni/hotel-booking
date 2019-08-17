const LOG = require('./src/utils/logger.js');
const CONFIG = require('./src/config/config.json');
const db = require('./src/utils/db.js');
const app = require('./app.js');

/**
 * Only upon successful connection to database, the server must start.
 */
db.connect()
.then(() => {
        // Run the server!
        app.listen(CONFIG.serverPort, CONFIG.serverHost, function (err, address) {
            if (err) {
                LOG.error(err);
                LOG.error("Shutting down the server...");
                process.exit(1);
            }
            LOG.info("--------------------------------------------");
            LOG.info(`Hotel Booking Server is running on ${address}`);
            LOG.info(`API documentation available at ${address}/docs`);
            LOG.info("--------------------------------------------");
        });
    }
);

module.exports = { app };

