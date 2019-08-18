const LOG = require('./src/utils/logger.js');
const CONFIG = require('./src/config/config.json');
const db = require('./src/utils/db.js');
const app = require('./app.js');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const UTILITY = require('./src/utils/utility.js');

UTILITY.validateConfigfileParameters();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running on Machine with ${numCPUs} CPUs`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
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
  
    console.log(`Worker ${process.pid} started`);
  }

module.exports = { app };

